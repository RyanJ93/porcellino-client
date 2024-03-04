FROM nginx:1.25

# Setup Node.js to compile front-end application using Webpack.
RUN apt-get update && apt-get install -y ca-certificates curl gnupg
RUN mkdir -p /etc/apt/keyrings && curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
RUN apt-get update && apt-get install -y nodejs
RUN useradd --create-home --shell /bin/bash porcellino

COPY . /home/porcellino
RUN chown -R porcellino /home/porcellino
RUN chmod +x /home/porcellino/docker_start.sh

USER porcellino
WORKDIR /home/porcellino

# Cleanup directories.
RUN rm -rf /home/porcellino/node_modules
RUN rm -rf /home/porcellino/config

RUN npm install --ignore-scripts

USER root

CMD ["sh", "/home/porcellino/docker_start.sh"]
