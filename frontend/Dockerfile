FROM node
WORKDIR /frontend
COPY . .
RUN rm -r node_modules
RUN ls 
RUN npm install
RUN npm run build
EXPOSE 3000
ENTRYPOINT [ "npx", "serve", "dist" ]