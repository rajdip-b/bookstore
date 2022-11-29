FROM node
WORKDIR /backend
COPY . .
RUN rm -r node_modules
RUN npm install
EXPOSE 8080
ENTRYPOINT ["npm", "run", "serve"]