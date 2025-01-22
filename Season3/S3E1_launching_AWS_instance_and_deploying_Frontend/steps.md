# launching AWS instance & frontend deployment

- sign up to AWS Management Console.
- go to Console Home

## create a new machine

- search for 'EC2' (virtual servers in the cloud) on search bar
  EC2 - elastic comute an instance
- click on it > Launch instance
- fill name & tags > select OS ubuntu > instance type (t3.micro or whichever is available)
- key pair name - this is required to access the machine
  click on create new key pair > type key pair name > type: RSA > format: .pem

  .pem file is a secret key

- keep rest of the things unchanged > Launch instance on summary section
- click on instance id getting popped up on screen and it will redirect to instance page
- wait till Instance State is 'Running' and Status Check - passes all checks
- click on Connect > click on SSH client tab and follow the steps

## connecting through SSH client

- For Windows with OpenSSH:

1. Open PowerShell and navigate to the folder containing the .pem file:
   eg.- cd "C:\path\to\your\private-key"

2. Set secure file permissions:
   icacls "networkHub-secret.pem" /inheritance:r
   icacls "networkHub-secret.pem" /grant:r "%USERNAME%:F"

   \*\*NOTE: to check %USERNAME% if not taking automatically: whoami and put that username in place of %USERNAME%, eg.- "COMPUTERNAME\JohnDoe:F"

3. Verify Permissions: Check the permissions of the file:
   icacls "<key-pair name>.pem"

   It should show only your user account with full access.

4. Connect to your instance using its Public DNS

\*\*NOTE: if permission is denied, while checking permission showing many users. In that case follow the below steps:

- Using File Explorer:

1. Right-click on the networkHub-secret.pem file and select Properties.
2. Go to the Security tab.
3. Click Advanced.
4. Disable inheritance:
   - Click Disable inheritance.
   - Choose Remove all inherited permissions.
5. Add your user:
   - Click Add > Select a principal.
   - Enter your username and click Check Names.
   - Grant Full control.
6. Remove any other users or groups.
7. Click OK to save changes.

Then, Reattempt SSH Connection - Connect to your instance using its Public DNS

\*\*NOTE: if ubuntu terminal is ideal for sometime, it gets disconnected automatically. To reconnect reattempt SSH connection

## install node on machine

1. Download and install nvm:
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

2. Download and install Node.js:
   nvm install <version should match with node version installed in system>
   eg.- nvm install 22.8.0

   - Verify the Node.js version:
     node -v # Should print "v22.13.1".
     nvm current # Should print "v22.13.1".

   - Verify npm version:
     npm -v # Should print "10.9.2".

## cloning code repositories from github

git clone https://github.com/coderRemo/networkHub-Backend.git
git clone https://github.com/coderRemo/networkHub-Frontend.git

## deploying Frontend part

(system)

- run npm run build in VS-code

(machine/ubuntu)

- move to frontend folder
- npm install
- npm run build
- sudo apt update => this updates system dependencies/ubuntu updates
- sudo apt install nginx => install nginx to host frontend project
- sudo systemctl start nginx => start nginx
- sudo systemctl enable nginx => enables nginx, up and running
- copy code from dist(build files) to /var/www/html/
  sudo scp -r dist/\* /var/www/html/

- before checking the Public IPv4 address -> server is accessed on this IPv4
- enable port 80 on your instance
- search for Security tab > security groups > click on it
- edit Inbound rules to allow access to port 80 > click on it
- click on add rule > set port range 80 > click on searcg 0.0.0.0/0
