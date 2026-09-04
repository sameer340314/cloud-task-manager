# Cloud Task Manager 🚀

A production-style React task management application deployed using Docker and Kubernetes, automated through GitHub Actions CI/CD, monitored with Prometheus and Grafana, secured with Kubernetes security controls, and managed using Terraform.

## 🎯 Project Overview

Cloud Task Manager is an end-to-end Cloud + DevOps project demonstrating the practical lifecycle of a modern cloud-native application:

**Development → Git → CI/CD → Docker → Kubernetes → Scaling → Security → Monitoring → Alerting → Infrastructure as Code**

## 🏗️ Architecture

```text
Developer
    │
    ▼
GitHub Repository
    │
    ▼
GitHub Actions
    │
    ├── npm ci
    ├── npm run build
    ├── Docker build
    └── Docker push
    │
    ▼
Docker Hub
    │
    ▼
Kubernetes Cluster
    │
    ├── Deployment
    ├── NodePort Service
    ├── HPA
    ├── ConfigMap
    ├── Secret
    ├── PVC
    ├── ServiceAccount
    ├── RBAC
    └── NetworkPolicy
    │
    ├───────────────┐
    ▼               ▼
Prometheus       Grafana
    │
    ▼
Alertmanager
    │
    ▼
Webhook Alerts

Terraform
    │
    ▼
Kubernetes Infrastructure as Code
```

## 🛠️ Technology Stack

### Application

* React
* Vite
* Node.js

### Containerization

* Docker
* Docker Hub

### CI/CD

* GitHub
* GitHub Actions

### Kubernetes

* Kubernetes
* Deployment
* Service / NodePort
* Horizontal Pod Autoscaler
* ConfigMap
* Secret
* PersistentVolumeClaim
* ServiceAccount
* RBAC
* NetworkPolicy
* Liveness Probe
* Readiness Probe
* Resource Requests & Limits

### Monitoring & Observability

* Prometheus
* Grafana
* Alertmanager
* PrometheusRule

### Infrastructure as Code

* Terraform
* Kubernetes Provider

## 🔄 CI/CD Pipeline

The GitHub Actions pipeline performs:

1. Checkout source code
2. Setup Node.js
3. Install dependencies using `npm ci`
4. Build the React application
5. Build Docker image
6. Authenticate with Docker Hub
7. Push Docker image to Docker Hub

## ☸️ Kubernetes Deployment

The application is deployed inside the:

```text
cloud-devops
```

namespace.

Current deployment configuration:

```text
Replicas: 2
HPA Minimum: 2
HPA Maximum: 5
CPU Target: 70%
Service Type: NodePort
NodePort: 30434
```

## 📈 Horizontal Pod Autoscaling

HPA automatically adjusts the number of application pods based on CPU utilization.

```text
Minimum replicas: 2
Maximum replicas: 5
CPU target: 70%
```

This demonstrates Kubernetes workload scaling and resource management.

## 💾 Persistent Storage

The application uses a Kubernetes PersistentVolumeClaim:

```text
Name: cloud-task-manager-pvc
Capacity: 1Gi
Access Mode: RWO
Storage Class: standard
```

## 🔐 Kubernetes Security

Security controls implemented:

* Non-root container execution
* `runAsNonRoot`
* RuntimeDefault seccomp profile
* `allowPrivilegeEscalation: false`
* Linux capabilities dropped
* CPU and memory limits
* Liveness and readiness probes
* Dedicated ServiceAccount
* RBAC Role
* RoleBinding
* NetworkPolicy
* Kubernetes Secret

The NetworkPolicy restricts application ingress to the intended namespace.

## 📊 Monitoring

### Prometheus

Prometheus monitors Kubernetes/application metrics and evaluates alert rules.

### Grafana

Grafana provides Kubernetes dashboards for monitoring:

* CPU
* Memory
* Pods
* Namespace resources
* Workload health

### Alertmanager

Alertmanager handles alert delivery.

Example alert:

```text
CloudTaskManagerHighCPU
Condition: CPU > 70%
Duration: 2 minutes
```

The alert was tested for both **firing and recovery**.

## 🏗️ Terraform

Terraform is used for Infrastructure as Code.

Final infrastructure verification:

```bash
terraform plan
```

Expected result:

```text
No changes. Your infrastructure matches the configuration.
```

This confirms that the deployed Kubernetes infrastructure matches the Terraform configuration.

## 🚀 Run Locally

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Create production build:

```bash
npm run build
```

## 🐳 Run with Docker

Build image:

```bash
docker build -t cloud-task-manager .
```

Run container:

```bash
docker run -p 8080:8080 cloud-task-manager
```

## ☸️ Useful Kubernetes Commands

Check application:

```bash
kubectl get pods -n cloud-devops
```

Check deployment:

```bash
kubectl get deployment -n cloud-devops
```

Check service:

```bash
kubectl get svc -n cloud-devops
```

Check HPA:

```bash
kubectl get hpa -n cloud-devops
```

Check storage:

```bash
kubectl get pvc -n cloud-devops
```

Check security:

```bash
kubectl get role,rolebinding,serviceaccount,networkpolicy -n cloud-devops
```

Check rollout:

```bash
kubectl rollout status deployment/cloud-task-manager -n cloud-devops
```

## 🌐 Application Access

For local Kubernetes testing:

```bash
kubectl port-forward --address 0.0.0.0 -n cloud-devops svc/cloud-task-manager-service 8081:80
```

Then open:

```text
http://localhost:8081
```

For another device connected to the same Wi-Fi:

```text
http://<PC-LAN-IP>:8081
```

## 📁 Project Structure

```text
cloud-task-manager/
│
├── src/
│   ├── components/
│   └── ...
│
├── k8s/
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── hpa.yaml
│   ├── configmap.yaml
│   ├── secret.yaml
│   ├── pvc.yaml
│   ├── rbac.yaml
│   └── networkpolicy.yaml
│
├── terraform/
│   └── ...
│
├── .github/
│   └── workflows/
│
├── Dockerfile
├── package.json
└── README.md
```

## 🎯 Cloud + DevOps Skills Demonstrated

This project demonstrates practical knowledge of:

* Git & GitHub
* GitHub Actions
* CI/CD
* Docker
* Docker Hub
* Containerization
* Kubernetes
* Kubernetes networking
* Deployments
* Services
* HPA
* Persistent storage
* ConfigMaps
* Secrets
* RBAC
* NetworkPolicies
* Container security
* Health probes
* Resource management
* Prometheus
* Grafana
* Alertmanager
* Monitoring & Observability
* Terraform
* Infrastructure as Code
* Troubleshooting
* Production-style deployment practices



## 👨‍💻 Author

**md Sameer **

Cloud + DevOps Engineer Portfolio Project


