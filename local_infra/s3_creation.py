import boto3
import os

# Local folder to upload
local_folder2 = ["images_set1", "images_set2"] # Change to your folder path
bucket_name = "my-bucket"

s3 = boto3.client(
    "s3",
    endpoint_url="http://localhost:4566",
    region_name="us-east-1",
    aws_access_key_id="test",
    aws_secret_access_key="test",
)

s3.create_bucket(Bucket="my-bucket")
print("Bucket created")

# Walk through folder and upload files
for local_folder in local_folder2:
    for root, dirs, files in os.walk(local_folder):
        for file_name in files:
            full_path = os.path.join(root, file_name)
            # S3 key: folder_name/file_name
            relative_path = os.path.relpath(full_path, local_folder)
            s3_key = os.path.join(os.path.basename(local_folder), relative_path).replace("\\", "/")
            s3.upload_file(full_path, bucket_name, s3_key)
            print(f"Uploaded '{full_path}' as '{s3_key}'")

print("files uploaded")

