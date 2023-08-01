# How to install project on your VM Cloud

> Connecting on your server ssh, exemple :

```bash
 ssh student@{{YOUR_NAME_SERVER}}-server.eddi.cloud
```

1. Create a new folder `oresto`

```bash
mkdir /var/www/html/oresto
cd /var/www/html/oresto
```

2. Clone there repos :

```bash
git clone git@github.com:ErwannRousseau/o-resto-front.git
git clone git@github.com:ErwannRousseau/o-resto-back.git
```

3. Create Apache Configuration File
   Navigate to the /etc/apache2/sites-available directory:

```bash
cd /etc/apache2/sites-available
```

4. Create a new file called oresto.conf:

```bash
sudo vi oresto.conf
```

Add the following content to the file:

**Important: Make sure to replace {{YOUR_NAME_SERVER}} with your actual server name.**

```apache
<VirtualHost *:80>
    ServerName http://{{YOUR_NAME_SERVER}}-server.eddi.cloud
    DocumentRoot /var/www/html

    Alias /o-resto /var/www/html/oresto/o-resto-front/dist/
    <Directory /var/www/html/oresto/o-resto-front/dist>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    Alias /o-resto-back /var/www/html/oresto/o-resto-back/public
    <Directory /var/www/html/oresto/o-resto-back/public>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted

        <IfModule mod_headers.c>
            Header set Access-Control-Allow-Origin "http://{{YOUR_NAME_SERVER}}-server.eddi.cloud"
            Header set Access-Control-Allow-Methods "GET, POST, PATCH, DELETE, PUT"
            Header set Access-Control-Allow-Headers "Content-Type, Authorization"
        </IfModule>

    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

> To replace faster, run this command in Vim editor :
> Tap `:` to open the command line
> and copy/paste this : `%s/{{YOUR_NAME_SERVER}}/YOUR_REPLACEMENT/g`

> change YOUR_REPLACEMENT by yours

1. Enable the Apache Headers Module:
   Run the following command to enable the rewrite module:

```bash
sudo a2enmod headers
```

and create a link to enabled the oresto.conf

```bash
sudo ln -s /etc/apache2/sites-available/oresto.conf /etc/apache2/sites-enabled/
```

6. Restart Apache
   Run the following command to restart Apache:

```bash
sudo service apache2 restart
```

7. Update the .env File

Go to the folder :

```bash
cd /var/www/html/oresto/o-resto-front
```

and run this :

```bash
vi .env.production.local
```

In the .env.production file, copy/paste and update `{{YOUR_NAME_SERVER}}` by your real server name :

```bash
VITE_BASE_URL=http://{{YOUR_NAME_SERVER}}-server.eddi.cloud/oresto/o-resto-back/public
VITE_BASE_URL_BACKOFFICE=http://{{YOUR_NAME_SERVER}}-server.eddi.cloud/o-resto-back/
```

> To replace faster, run this command in Vim editor :
> Tap `:` to open the command line
> and copy/paste this : `%s/{{YOUR_NAME_SERVER}}/YOUR_REPLACEMENT/g`

> change YOUR_REPLACEMENT by yours

1. Install and Build the Front-End Project
   Go to the front-end project directory and run the following commands:

```bash
npm install
npm run build
```

9. Access the Projects
   The front-end of your site is now accessible at the following URL:

```bash
http://{{YOUR_NAME_SERVER}}-server.eddi.cloud/o-resto
```

And the back-end is accessible at:

```bash
http://{{YOUR_NAME_SERVER}}-server.eddi.cloud/o-resto-back
```

# How to install project on local

Clone the repos

```bash
git clone git@github.com:ErwannRousseau/o-resto-front.git
git clone git@github.com:ErwannRousseau/o-resto-back.git
```

In **o-resto-front** folder run this :

```bash
npm install
npm run dev
```

the server are launch on **<http://localhost:5173>**

and setup the backend folder for dev mode
