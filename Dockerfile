FROM nodesource/jessie:0.10.35

RUN mkdir -p /usr/src/canvas
WORKDIR /usr/src/canvas

COPY package.json /usr/src/canvas/
RUN npm install

COPY . /usr/src/canvas

EXPOSE 20000

CMD [ "npm", "start" ]