# Timed-unlock for Full Stack open 2021
This is a full-stack project I've been developing for a while. I copied the files from the original repositories here to use containerize them more easily. The original repositories have frontend and backend repositories separated, so I merged them here for this course.

The project is essentially a way to unlock data after a specific time, for example, if you want to release some Christmas calendar data only once in a day, this project is useful for that.

The reason I don't containerize the actual repositories is because I feel like they need a bit more cleanup and refactoring to be containerized.

## Usage
To run the application in production mode, run `docker-compose up`, and in development mode, run `docker-compose -f docker-compose.dev.yml up`. You may need to add the `--build` parameter if you are running the application for the first time.

The end user uses this project only via the API.

All of the UI is only the administrator panel, and end users don't use that.

## Structure

### Backend (https://github.com/Eldemarkki/timed-unlock-backend)
The project has a basic backend with JWT authorization. It is developed with Node.js and Express with TypeScript.

### Frontend (https://github.com/Eldemarkki/timed-unlock-frontend)
The frontend is made with `create-react-app`, and uses typescript. The end user should not have access to any UI, because the UI consists only of an administrator panel.