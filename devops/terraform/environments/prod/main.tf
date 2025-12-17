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
