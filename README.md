# Browserstack local tool containerized
This repo contains a Dockerfile that create an image containing the _BrowserStackLocal_ executable. Additionally, Helm deployment manifest file is provided for K8S cluster deployment.

_BrowserStackLocal_ seres as a tool to create a tunnel from any machine - which is in most cases not public facing and propably behind a company firewall - to the Browserstack.com Hub and the attached Selenium Grid. Therefore, it uses port 443 and websockets.

# Docker Hub
Image registry link:

    https://cloud.docker.com/u/binaryguy/repository/docker/binaryguy/browserstacklocaltesting


# Env vars
ACCESS_KEY: BS access token

# Deployment
The deployment folder consists of an deplyoment manifest to deploy a k8s service.
There are mainly two ways to deploy this in a cluster

## K8S

    kubectl create -n portal-dev -f .\deployment.yaml
    kubectl apply -n portal-dev -f .\deployment.yaml

### Helpful commands

    kubectl get namespaces
    kubectl get pods -n portal-dev
    kubectl get services -n portal-dev
    kubectl get deployments -n portal-dev

    kubectl describe pod -n portal-dev portal-frontend
    kubectl describe service -n portal-dev portal-frontend

Exec in machine

    kubectl exec -n portal-dev --it browserstacklocal-6f5cf6c94c-s26qf - /bin/sh
    kubectl scale deployment -n portal-dev browserstack --replicas 0

## Helm
Will create deployment if not exists

    helm upgrade --tiller-namespace portal-dev --namespace portal-dev --install --wait browserstacklocal .\deployment\
    helm delete --purge --tiller-namespace portal-dev browserstacklocal
    helm list --tiller-namespace portal-dev