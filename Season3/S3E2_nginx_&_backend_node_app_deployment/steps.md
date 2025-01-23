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

## merging Frontend & Backend
