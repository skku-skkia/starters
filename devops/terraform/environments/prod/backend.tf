terraform {
  backend "gcs" {
    bucket = "skkia-tf-state"
    prefix = "terraform/state"
  }
}

resource "google_storage_bucket" "tf_state" {
  name                        = "skkia-tf-state"
  location                    = "US"
  uniform_bucket_level_access = true
  versioning {
    enabled = true
  }
}
