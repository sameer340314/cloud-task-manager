terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 3.2"
    }
  }
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}

resource "kubernetes_namespace_v1" "cloud_devops" {
  metadata {
    name = "cloud-devops"
  }
}

resource "kubernetes_deployment_v1" "cloud_task_manager" {
  metadata {
    name      = "cloud-task-manager"
    namespace = "cloud-devops"
  }

  spec {
    replicas = 2

    progress_deadline_seconds = 600
    revision_history_limit    = 10

    strategy {
      type = "RollingUpdate"

      rolling_update {
        max_surge       = 1
        max_unavailable = 0
      }
    }

    selector {
      match_labels = {
        app = "cloud-task-manager"
      }
    }

    template {
      metadata {
        labels = {
          app = "cloud-task-manager"
        }
      }

      spec {
        service_account_name            = "cloud-task-manager-sa"
        automount_service_account_token = false
        enable_service_links             = false

        termination_grace_period_seconds = 30

        security_context {
          run_as_user     = 101
          run_as_group    = 101
          run_as_non_root = true

          seccomp_profile {
            type = "RuntimeDefault"
          }
        }

        container {
          name              = "cloud-task-manager"
          image             = "sameer340314/cloud-task-manager:v3"
          image_pull_policy = "IfNotPresent"

          port {
            container_port = 8080
            protocol       = "TCP"
          }

          env_from {
            config_map_ref {
              name = "cloud-task-manager-config"
            }
          }

          env_from {
            secret_ref {
              name = "cloud-task-manager-secret"
            }
          }

          liveness_probe {
            initial_delay_seconds = 10
            period_seconds        = 10
            timeout_seconds       = 1
            failure_threshold     = 3
            success_threshold     = 1

            http_get {
              path   = "/"
              port   = 8080
              scheme = "HTTP"
            }
          }

          readiness_probe {
            initial_delay_seconds = 5
            period_seconds        = 5
            timeout_seconds       = 1
            failure_threshold     = 3
            success_threshold     = 1

            http_get {
              path   = "/"
              port   = 8080
              scheme = "HTTP"
            }
          }

          resources {
            requests = {
              cpu    = "100m"
              memory = "128Mi"
            }

            limits = {
              cpu    = "500m"
              memory = "256Mi"
            }
          }

          security_context {
            allow_privilege_escalation = false

            capabilities {
              drop = ["ALL"]
            }
          }

          volume_mount {
            name       = "task-manager-storage"
            mount_path = "/data"
          }
        }

        volume {
          name = "task-manager-storage"

          persistent_volume_claim {
            claim_name = "cloud-task-manager-pvc"
          }
        }
      }
    }
  }
}