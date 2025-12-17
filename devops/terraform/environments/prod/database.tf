resource "google_secret_manager_secret" "database_credentials" {
  secret_id = "database-credentials"

  replication {
    auto {}
  }
}

resource "random_password" "database_password" {
  length      = 64
  min_lower   = 8
  min_upper   = 8
  min_numeric = 8
  min_special = 8
}

resource "google_secret_manager_secret_version" "database_credentials_version" {
  secret = google_secret_manager_secret.database_credentials.id
  secret_data = jsonencode({
    username = "skkia",
    password = random_password.database_password.result,
  })
}

resource "google_sql_database_instance" "main" {
  name             = "main"
  region           = var.region
  database_version = "POSTGRES_15"

  settings {
    tier              = "db-f1-micro"
    availability_type = "REGIONAL"

    backup_configuration {
      enabled = false
    }

    ip_configuration {
      ipv4_enabled    = false
      private_network = google_compute_network.main.id
    }
  }

  deletion_protection = true
  depends_on          = [google_service_networking_connection.private_vpc_connection]
}

resource "google_sql_database" "default" {
  name     = "skkia-database"
  instance = google_sql_database_instance.main.name
}

resource "google_sql_user" "users" {
  name     = "skkia"
  instance = google_sql_database_instance.main.name
  password = random_password.database_password.result
}

