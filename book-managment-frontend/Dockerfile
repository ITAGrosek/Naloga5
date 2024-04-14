# Uporabite uradno Node.js sliko z LTS verzijo Node.js
FROM node:lts-alpine

# Nastavite delovni direktorij v kontejnerju
WORKDIR /app

# Kopirajte package.json in package-lock.json datoteki
COPY package*.json ./

# Namestite odvisnosti projekta
RUN npm install

# Kopirajte vse datoteke iz lokalnega direktorija v delovni direktorij v kontejnerju
COPY . .

# Zgradite aplikacijo
RUN npm run build

# Izpostavite port, na katerem bo aplikacija dostopna
EXPOSE 7000

# Zaženite aplikacijo
CMD ["npm", "run", "start"]
