curl -H "Content-Type: application/x-www-form-urlencoded" \
-u orderprocessingapp:orderprocessingappsecret \
-d "grant_type=client_credentials&scope=read&scope=write" http://localhost:8085/auth/token


# used oauth package docs:
https://oauth2-server.readthedocs.io/en/latest/model/spec.html