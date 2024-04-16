FROM python:3.11-alpine3.19
WORKDIR /Flask-Backend/app
COPY . /Flask-Backend/app
RUN pip install -r requirements.txt
EXPOSE  3000
CMD python ./Flask-Backend/app