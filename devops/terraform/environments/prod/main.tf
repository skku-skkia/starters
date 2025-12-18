resource "google_compute_instance" "server" {
  name         = "server"
  machine_type = "e2-micro"
  zone         = "us-central1-a"

  boot_disk {
    initialize_params {
      image = "cos-cloud/cos-stable"
    }
  }

  network_interface {
    network    = google_compute_network.main.id
    subnetwork = google_compute_subnetwork.public.id
  }

  metadata = {
    user-data = file("../../scripts/server-init.yaml")
  }
}

resource "google_cloud_run_service" "web" {
  name     = "web"
  location = "us-central1"

  template {
    spec {
      containers {
        name  = "web"
        image = "us-central1-docker.pkg.dev/project-7631342c-9ec4-4554-963/docker/web:latest"
        ports {
          container_port = 3000
        }
      }
    }
  }
}

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location = google_cloud_run_service.web.location
  project  = google_cloud_run_service.web.project
  service  = google_cloud_run_service.web.name

  policy_data = data.google_iam_policy.noauth.policy_data
}
