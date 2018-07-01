# DavidMaps
	
Desarrollo web (demo) donde usamos el Places API de Google Maps para calcular la distancia entre la posicion actual de un usuario y una ubicacion dada
Uso de Babel CLI para la traspilacion de codigo bajo estandares ES6 y lograr la compatibilidad entre todos los browsers

## Dependencias
	
	- Instalacion de babel-CLI
		 npm install -g babel-cli

	- Instalacion del preset es2015
		npm install babel-preset-es2015

	- Compila/Transpilar archivos
		babel <script> --out-file <script-transpiled>

		--watch (deamon para que este pendiente de verificar el archivo original)

		--presets es2015 (Vanilla JS to ES6)

## Servidor 

	Inline PHP Webserver
	php -S 127.0.0.1 (sobre el directorio del repositorio)

## Google API Key
	
	Es importante crear una API desde la consola de Google Developers para poder usar y trackear informacion del consumo y otras metricas

## Créditos
- [David E Lares S](https://twitter.com/@davidlares3)

## Licencia

- [MIT](https://opensource.org/licenses/MIT)