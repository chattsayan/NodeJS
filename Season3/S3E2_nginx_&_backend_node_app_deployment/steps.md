# Nginx & Backend Node App Deployment

- move to backend folder
- npm install
- npm start
  while npm start, the it is not getting connected, go to mongoDb atlas > network access > add IP address > put the Public IPv4 address from EC2 instance
- enable backend server port(eg.- port 7777) on EC2 instance
- search for Security tab > security groups > click on it
- edit Inbound rules to allow access to port 80 > click on it
- click on add rule > set port range 7777 > click on search 0.0.0.0/0

\*\*NOTE: if npm start is executed on machine, the terminal might stop after sometime, leading to stopping of application, in order to keep that server connected forever need to install PM2 (which is a process manager that keeps the application online 24/7)

- install pm2 on machine -> npm install pm2 -g
- start the process via process manager => pm2 start npm -- start
- to check logs: pm2 logs
- to clear logs: pm2 flush npm (npm - name of process)
- shows list of processes: pm2 list
- to stop process: pm2 stop npm
- to delete process: pm2 delete npm
- to name process: pm2 start npm --name "<name>" -- start

## merging Frontend & Backend

plan:
Frontend = http://<ip>/
Backend = http://<ip>:<port>/

Domain name = devtinder.com => as we do not have any domain name, <ip> will be considered as domain name

Frontend = devtinder.com
Backend = devtinder.com:<port> => devtinder.com/api

ie, backend will run on /api and frontend will run on devtinder.com

in order to merger the port, need to use nginx proxy pass

- Update the Nginx Configuration File

  - go to path: sudo nano /etc/nginx/sites-available/default

  - scroll down and chanhe the below configurations:
    server_name yourdomain.com; # Replace with your domain or IP address

    location /api/ {
    proxy_pass http://127.0.0.1:7777/; # in place of IP put localhost
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    }

  - restart nginx: sudo systemctl restart nginx

- modify the BASE_URL in frontend project to /api
- commit in gitHub
- in machine > go to frontend directory, type the below commands:
  - git pull
  - npm run build
  - sudo scp -r dist/\* /var/www/html
