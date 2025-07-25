variable "NODE_VERSION" {
  default = "22.5"
}
variable "PORTAL_WEB_SERVER_BUILDER_TAG" {
  default = "v2.1.0"
}

# Populated from GitHub Action
variable "REPO" {
  default = ""
}

group "default" {
  targets = [
    "portal-core-components",
  ]
}

# Populated from GitHub Action
target "docker-metadata-action" {
  tags = []
}

target "bootstrap" {
  platforms = [ "linux/amd64" ]
  no-cache = true
}

target "portal-core-components" {
  inherits = ["bootstrap", "docker-metadata-action"]
  tags = [for tag in target.docker-metadata-action.tags : tag]
  dockerfile = "bake.Dockerfile"
  contexts = {
    "portal-web-server-builder:current" = "docker-image://${REPO}/portal-web-server-builder:${PORTAL_WEB_SERVER_BUILDER_TAG}"
    "portal-react-apps/node:current" = "docker-image://node:${NODE_VERSION}-alpine"
  }
}
