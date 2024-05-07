# Websandbox - Code. Experiment. Create. The Online Sandbox For Your Programming Ideas.<br/>
> Build your web application completely on the web. With html, css, javascript and typescript support by default.<br/><br/>
![websandbox-home-light](https://github.com/ogayanfe/websandbox/assets/95624629/c2a48e84-1dc1-4f0c-83c5-7bbb6e40eb73)

## Project Demo
* Watch a video demo on <a href="https://www.youtube.com/watch?v=mwFe1FtTL7o" target="_blank">Youtube</a>
*  Go to <a href="https://websandboxx.netlify.app" target="_blank">project live demo</a>. 
* Images are provided at the end of the page.<br/>

## Project Features
- A code editor.
- Live reloading.
- A browser for viewing project output.
- Ability to save your project.
- Ability to view other users work.
- Login and Logout.

## Tools 
- Python
- Typescript
- Django and Django rest framework
- React
- Vite
- React router
- Webcontainers
- Tailwind css
- Material ui and Material ui icons

## Setting up locally
- Clone the project to your local computer using git via command `git clone https://github.com/ogayanfe/birdie.git`. You can simply download the zip folder and unzip if you don't have git installed.
- `cd` into the application folder using your terminal.
-  `cd` into the backend direcory via the command `cd backend`.
- You can create and activate a virtual environment here.
- `cd` into the backend directory and run the command `python3 install -r requirments.txt` or `python install -r requirements.txt` on windows to install requirements.
- You will lead to provide the following environment variables in your prduction environment.
  1. `SECRET_KEY` - Your django secret key. COMPULSORY. 
  2. `DEBUG` - Whether the code should run in debug mode. It's value is either `True` or `False`. Defaults to `True`
  3. `AWS_ACCESS_KEY_ID` - Your AWS access key id.
  4. `AWS_SECRET_ACCESS_KEY_ID` - Your AWS secret access key id.
  5. `AWS_STORAGE_BUCKET_NAME` - Your AWS bucket name.
  6. `USE_S3` - Whether the project should use aws s3 storage. It's value is either `True` or `False`. Default to `!DEBUG`
- Run the command `python3 manage.py migrate` or `python manage.py migrate` on windows to load the database. 
- Run the command `python3 manage.py runserver` or `python manage.py runserver` on windows to start the django development server. 
- Go back into the root folder of the repo and  `cd` into the websandbox folder with command `cd websandbox`
- Run the command `npm install` to install requirements
- Run the command `npm run dev` to start the react development server. 
- Navigate to the url `localhost:5173` on your browser

## License 
> Licensed under <a href='https://github.com/ogayanfe/websandbox?tab=GPL-3.0-1-ov-file#GPL-3.0-1-ov-file'>GPL-3.0</a>

## Image Galary
> ### Landing Page
>![websandbox-home-light](https://github.com/ogayanfe/websandbox/assets/95624629/c2a48e84-1dc1-4f0c-83c5-7bbb6e40eb73)
>![websandbox-home-dark](https://github.com/ogayanfe/websandbox/assets/95624629/faa16e44-e6f9-4774-b893-3fc676f830f0)

### Dashboard 
> ![websandboxx netlify app_dashboard_ (3)](https://github.com/ogayanfe/websandbox/assets/95624629/86b866b5-b5a5-472b-8dc6-4404dd630398) <br/>
> ![websandboxx netlify app_dashboard_ (1)](https://github.com/ogayanfe/websandbox/assets/95624629/9c67f93e-4286-4bb6-8fcb-3bbcc4a0c05e) <br/><br/>

### Demos
> ![websandbox-demos-light](https://github.com/ogayanfe/websandbox/assets/95624629/45d9ce62-7c07-4f78-94a0-fd48e327c1c1) <br/>
> ![websandbox-demos-dark](https://github.com/ogayanfe/websandbox/assets/95624629/8b0969ce-b1ce-4d3d-ab2e-8b71450b209a)<br/><br/>

## Sandbox Editor
> ![websandbox-editor-light](https://github.com/ogayanfe/websandbox/assets/95624629/f631f5cc-492c-4e7f-afb1-6a9e655a6efd)<br/>
> ![websandbox-editor-dark](https://github.com/ogayanfe/websandbox/assets/95624629/d4ea3636-0a74-4d67-9f71-6903b7640ff1)<br/><br/>

### Sandbox Editor with output
> ![websandbox-editor-project-light](https://github.com/ogayanfe/websandbox/assets/95624629/49ef34d6-3ded-4ebf-a732-42ca73358df7)<br/>
> ![websandbox-editor-project-dark](https://github.com/ogayanfe/websandbox/assets/95624629/4c8d638d-b951-4316-835d-ce8decb54bc4)<br/><br/>

