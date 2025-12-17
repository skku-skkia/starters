resource "google_compute_network" "main" {
  name                            = "main"
  routing_mode                    = "REGIONAL"
  delete_default_routes_on_create = true
  auto_create_subnetworks         = false
  depends_on                      = [google_project_service.api]
}

resource "google_compute_subnetwork" "public" {
  name          = "public"
  ip_cidr_range = "10.0.1.0/24"
  region        = var.region
  network       = google_compute_network.main.id
  stack_type    = "IPV4_ONLY"
}

resource "google_compute_subnetwork" "private" {
  name                     = "private"
  ip_cidr_range            = "10.0.2.0/24"
  region                   = var.region
  network                  = google_compute_network.main.id
  private_ip_google_access = true
  stack_type               = "IPV4_ONLY"
}

resource "google_compute_global_address" "private_range" {
  name          = "sql-private-ip-range"
  purpose       = "VPC_PEERING"
  address_type  = "INTERNAL"
  prefix_length = 16 # Pick a /16 or /24 range not used elsewhere
  network       = google_compute_network.main.id
}

resource "google_service_networking_connection" "private_vpc_connection" {
  network                 = google_compute_network.main.id
  service                 = "servicenetworking.googleapis.com"
  reserved_peering_ranges = [google_compute_global_address.private_range.name]
}


resource "google_compute_firewall" "firewall" {
  name    = "firewall"
  network = google_compute_network.main.name

  allow {
    protocol = "tcp"
    ports    = ["443"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["app-server"]
}

resource "google_compute_firewall" "private_sql" {
  name    = "allow-app-to-sql"
  network = google_compute_network.main.name

  allow {
    protocol = "tcp"
    ports    = ["5432"]
  }

  source_tags = ["app-server"]
  target_tags = ["cloud-sql"]
}

