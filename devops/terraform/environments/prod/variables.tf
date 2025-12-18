variable "project_id" {
  type    = string
  default = "project-7631342c-9ec4-4554-963"
}

variable "region" {
  type    = string
  default = "us-central1"
}

variable "api" {
  type = list(string)
  default = [
    "compute.googleapis.com",
    "container.googleapis.com",
    "logging.googleapis.com",
    "secretmanager.googleapis.com",
    "servicenetworking.googleapis.com",
    "run.googleapis.com",
    "cloudbuild.googleapis.com",
  ]
}
