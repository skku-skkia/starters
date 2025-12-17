provider "google" {
  project = var.project_id
  region  = var.region
}

resource "google_project_service" "api" {
  for_each           = toset(var.api)
  service            = each.key
  disable_on_destroy = false
}
