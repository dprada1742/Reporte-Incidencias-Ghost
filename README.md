## Pruebas E2E

### Semana 06
### Pre-requisitos
1. Para ejecutar las pruebas E2E se debe correr Ghost de manera local. Para el entregable de la semana 05, es obligatorio correr ghost 4.44.0. Es aconsejable ejecutar el siguiente comando para su ejecución docker:
<pre><code>docker run -d -e url=http://localhost:3002 -p 3002:2368 --name ghost_4.44.0 ghost:4.44.0</code></pre>
2. Para ejecutar las pruebas en Cypress, se debe configurar el archivo [loginData.json](https://github.com/dprada1742/Reporte-Incidencias-Ghost/blob/main/CypressE2E/cypress/fixtures/loginData.json), disponible en la carpeta de fixtures. Allí se debe configurar el puerto de ejecución de ghost y las credenciales para autenticarse.
3. Para ejecutar las pruebas en Kraken, se debe configurar el puerto de ejecución de ghost en cada uno de los archivos "_step.js"

### Ejecución VRT
1. Ubicarse en la carpeta VRT_Cypress
2. Ejecutar el comando <pre><code>npm install</code></pre>
3. Una vez las dependencias estén instaladas, es posible ejecutar el comando de ejecución para la generación del reporte VRT
<pre><code>node index.js</code></pre>
4. En consola obtendrá el nombre del reporte generado. De igual forma, encontrará el reporte en la carpeta de results/
5. Dentro de la carpeta de results, observará que se genera una carpeta por cada escenario más una carpeta con el formato results_yy_mm_dd_hh:mm:ss. Dentro de esa carpeta encontrará el archivo index.html con el reporte de ejecución.

### Creación de screenshots por step
Al ejecutar los siguientes pasos en la última versión de este repositorio, usted podrá obtener una carpeta de screenshots (tanto en cypress como en ghost) para su futura prueba de regresión visual.
#### Pasos para ejecutar pruebas creadas en Cypress
1. Ubicarse en la carpeta CypressE2E
2. Ejecutar el comando <pre><code>npm install</code></pre>
3. Una vez las dependencias estén instaladas, es posible ejecutar las pruebas en Cypress
<pre><code>npx cypress run</code></pre>

#### Pasos para ejecutar pruebas creadas en Kraken
1. Ubicarse en la carpeta Kraken

2. Ejecutar el comando <pre><code>npm install</code></pre>

3. Una vez las dependencias estén instaladas, es posible ejecutar las pruebas en Kraken

<pre><code>npx kraken-node run</code></pre>

*Debido a limitaciones de Kraken, no es posible ejecutar todos los features en una única ejecución, por esto se deben copiar los features que no se quieran ejecutar en una ubicación diferente a la que se encuentran actualmente. Se proporciona una carpeta para moves los features temporalmente:* temp_avoidFeatureRun

### Semana 05
### Pre-requisitos
1. Para ejecutar las pruebas E2E se debe correr Ghost de manera local. Para el entregable de la semana 05, es obligatorio correr ghost 3.4.1.
2. Para ejecutar las pruebas en Cypress, se debe configurar el archivo [loginData.json](https://github.com/dprada1742/Reporte-Incidencias-Ghost/blob/main/CypressE2E/cypress/fixtures/loginData.json), disponible en la carpeta de fixtures. Allí se debe configurar el puerto de ejecución de ghost y las credenciales para autenticarse.
3. Para ejecutar las pruebas en Kraken, se debe configurar el puerto de ejecución de ghost en cada uno de los archivos "_step.js"

* [Pros/Contras Cypress](https://github.com/dprada1742/Reporte-Incidencias-Ghost/wiki/an%C3%A1lisis-cypress)
* [Pros/Contras Kraken](https://github.com/dprada1742/Reporte-Incidencias-Ghost/wiki/an%C3%A1lisis-kraken)

### Pasos para ejecutar pruebas creadas en Cypress
1. Ubicarse en la carpeta CypressE2E
2. Ejecutar el comando <pre><code>npm install</code></pre>
3. Una vez las dependencias estén instaladas, es posible ejecutar las pruebas en Cypress
<pre><code>npx cypress run</code></pre>

### Pasos para ejecutar pruebas creadas en Kraken
1. Ubicarse en la carpeta Kraken

2. Ejecutar el comando <pre><code>npm install</code></pre>

3. Una vez las dependencias estén instaladas, es posible ejecutar las pruebas en Kraken

<pre><code>npx kraken-node run</code></pre>

*Debido a limitaciones de Kraken, no es posible ejecutar todos los features en una única ejecución, por esto se deben copiar los features que no se quieran ejecutar en una ubicación diferente a la que se encuentran actualmente. Se proporciona una carpeta para moves los features temporalmente:* temp_avoidFeatureRun


### Funcionalidades y escenarios de prueba

|Funcionalidad |	Escenario | Tester |
|--------------|:------------:|---------------------:|
|Crear tag |	Crear tag datos válidos	| Daniela Prada|
|Crear tag |	Crear tag nombre repetido | Daniela Prada|
|Crear tag |	Crear tag con descripción inválida	| Daniela Prada|
|Crear tag |	Crear tag sin slug	| Daniela Prada|
|Editar tag	| Editar tag datos validos | Daniel Buelvas|
|Editar tag	| Editar tag nombre repetido | Juan David Torres|
|Editar tag	| Editar tag con descripción inválida | Daniela Prada|
|Editar tag	| Editar tag sin slug | Sebastian Ulloa|
|Crear post	| Crear Nuevo Post | Daniel Buelvas|
|Crear post	| Crear Nuevo Post con Título vacío | Daniel Buelvas|
|Crear post	| Crear Nuevo Post con Contenido vacío | Daniel Buelvas|
|Crear post	| Crear Nuevo Post y agendarlo para su publicación | Daniel Buelvas|
|Editar post| Editar post datos validos | Sebastian Ulloa|
|Editar post| Editar post nombre repetido| Sebastian Ulloa|
|Editar post| Editar post añadir tag existente| Sebastian Ulloa|
|Editar post| Editar post modificar URL | Sebastian Ulloa|
|Editar Contraseña de usuario| Editar Contraseña válida | Juan David Torres|
|Editar Contraseña de usuario| Editar Contraseña muy corta | Juan David Torres|
|Editar Contraseña de usuario| Editar Contraseña en blanco | Juan David Torres|
|Editar Contraseña de usuario| Editar Contraseña insegura | Juan David Torres|

# Reporte-Incidencias-Ghost:
[Wiki documentación Entrega Semana 04](https://github.com/dprada1742/Reporte-Incidencias-Ghost/wiki)
