# Semana 07 Generación de datos

La información de los escenarios creados para la semana 07 se encuentra en la [wiki](https://github.com/dprada1742/Reporte-Incidencias-Ghost/wiki/escenarios-datos-generados)
<br>Los pasos para ejecutar las pruebas se mantienen iguales a los de la semana 6. 
<br><br>Recomendación: Para las pruebas apriori en Kraken, es necesario comentar las rows que no se quieren probar en la tabla de Examples. Esto debido a un error que presenta Kraken.

# Semana 06 VRT

### Video disponible en [YouTube](https://www.youtube.com/watch?v=sxUo42DRf5Q&t=1s)

### Funcionalidades presentes en las pruebas

|Funcionalidad  | Tester |
|--------------|---------------------:|
|Crear tag| Daniela Prada|
|Editar tag	| Todos los integrantes del equipo|
|Crear post	| Sebastian Ulloa|
|Editar post	| Daniel Buelvas|
|Editar Contraseña de usuario| Juan David Torres|

Pros y contras: [Resemble](https://github.com/dprada1742/Reporte-Incidencias-Ghost/wiki/an%C3%A1lisis-resemble) y [Backstop](https://github.com/dprada1742/Reporte-Incidencias-Ghost/wiki/an%C3%A1lisis-backstop)

Incidentes de regresión visual se pueden encontrar en los [issues](https://github.com/dprada1742/Reporte-Incidencias-Ghost/issues) de este repositorio

## Cypress

#### Escenarios modificados con Screenshots en Cypress
Dentro del repositorio, se encuetra la carpeta llamada CypressE2E, que contiene todos los archivos y recursos necesarios para ejecutar las pruebas automatizadas cypress de las funcionalidades descritas en la sección anterior.

Dentro de la carpeta "CypressE2E", se encuentra la subcarpeta "cypress/e2e". Dentro de esta subcarpeta, hay dos subcarpetas adicionales: "pages 3.4.1" y "pages". En estas carpetas se encuentran las Clases Page Object correspondientes a las respectivas versiones de Ghost.

Dentro de la subcarpeta "cypress/e2e", también se encuentran las subcarpetas "Tests 3.4.1" y "Tests 4.44". Estas subcarpetas contienen las pruebas automatizadas correspondientes a cada versión específica de Ghost.

En ambas versiones se ve la implementacion de los screen shots. Vale la pena destacar que para la version 3.4.1 hay 20 escenarios y para la version 4.44 hay 10 escenarios. 

### Pre-requisitos para la ejecución de puebas
1. Para ejecutar las pruebas E2E de la semana 6 se debe correr Ghost de manera local en la version 3.4.1 y adicionalmente en la version 4.44. Asumiendo que ya se tiene instalada y corriendo la version 3.4.1, es aconsejable ejecutar el siguiente comando para la ejecución de la version 4.44:
<pre><code>docker run -d -e url=http://localhost:2368 -p 2368:2368 --name ghost_4.44.0 ghost:4.44.0</code></pre>
2. Para ejecutar las pruebas en Cypress, se debe configurar el archivo [loginData.json](https://github.com/dprada1742/Reporte-Incidencias-Ghost/blob/main/CypressE2E/cypress/fixtures/loginData.json), disponible en la carpeta de fixtures. Allí se debe configurar la URL de ghost y las credenciales para autenticarse.

#### Ejecución de las pruebas
Para ejecutar los escenarios en cypress se deben seguir los siguientes pasos:
1. Ubicarse en la carpeta CypressE2E
2. Ejecutar el comando:
<pre><code>npm install</code></pre>
4. Una vez las dependencias estén instaladas, es posible ejecutar las pruebas en Cypress. Dependiendo de la version de ghost que desee probar, modifique la URL en  [loginData.json](https://github.com/dprada1742/Reporte-Incidencias-Ghost/blob/main/CypressE2E/cypress/fixtures/loginData.json).
5. Para ejecutar las pruebas de la version 3.4.1 correr el siguiente comando:
<pre><code>npx cypress run --spec cypress/e2e/Tests\ 3.4.1/*.js</code></pre>
5. Para ejecutar las pruebas de la version 4.44 correr el siguiente comando:
<pre><code>npx cypress run --spec cypress/e2e/Tests\ 4.44/*.js</code></pre>
6. En la carpeta de screenshots de cypress se verán los pantallazos capturados durante las pruebas.

## Kraken

#### Escenarios modificados con screenshots 

Dentro de la carpta "Kraken" se encuentran todos los archivos y recursos necesarios para ejecutar las pruebas automatizadas de las funcionalidades descritas anteriormente.
Es importante tener en cuenta que actualmente solo se puede ejecutar un archivo .feature a la vez en las pruebas. Por lo tanto, se recomienda mover los archivos .feature ubicados en la carpeta "features" a una ubicación separada y tener solo un archivo .feature en la carpeta a la vez. 
En este proyecto se encuentran los 40 escenarios actualizados con la funcionalidad de los screensshots

#### Ejecución de las pruebas
1. Para ejecutar las pruebas en Kraken, se debe configurar el puerto de ejecución de ghost en cada uno de los archivos "_step.js"

### Pasos para ejecutar pruebas creadas en Kraken
1. Ubicarse en la carpeta Kraken
2. Ejecutar el comando <pre><code>npm install</code></pre>
3. Una vez las dependencias estén instaladas, es posible ejecutar las pruebas en Kraken

<pre><code>npx kraken-node run</code></pre>

*Debido a limitaciones de Kraken, no es posible ejecutar todos los features en una única ejecución, por esto se deben copiar los features que no se quieran ejecutar en una ubicación diferente a la que se encuentran actualmente. Se proporciona una carpeta para moves los features temporalmente:* temp_avoidFeatureRun

*Debido a limitaciones de Kraken, no es posible ejecutar todos los features en una única ejecución, por eso en la tabla de datos para cada escenarios, secomentaron las filas subyacentes a la primera, para correr todos los escenarios con todas los datos de la tabla debe quitar los comentarios, pero esto hace que se corran todos en paralelo y puede producir errores.

![imagen](https://github.com/dprada1742/Reporte-Incidencias-Ghost/assets/124740068/22161ba1-00bf-4d0a-9a8d-7f5d7486098a)


## Ejecución VRT

Todos los archivos necesarios para ejecutar las pruebas de regresión visual se encuentran dentro de la carpeta VTR_Cypress. Vale la pena destacar que dentro de esta carpeta se encuentran las subcarpetas "ghost 3.4.1" y "ghost 4.44". Estas a su vez contienen subcarpetas que indican las funcionalidades y posteriormente el nombre de los escenarios sobre los cuales se van a correr las pruebas de regresión visual.

Dentro de las carpetas de los escenarios ya se encuentran los screenshots de los 10 escenarios que se van a evaluar. Estos son los screenshots generados por las pruebas en Cypress.

Para que las pruebas de regresión funcionen correctamente los screenshots de los pasos que resultaron de las pruebas sobre la version 3.4.1 deben tener exactamente el mismo nombre de los screenshots que se generaron por las pruebas de la version 4.44.

#### Ejecución de las pruebas
1. Ubicarse en la carpeta VRT_Cypress
2. Ejecutar el comando <pre><code>npm install</code></pre>
3. Una vez las dependencias estén instaladas, es posible ejecutar el comando de ejecución para la generación del reporte VRT mediante el comando:
<pre><code>node index.js</code></pre>
4. En consola obtendrá el nombre del reporte generado. De igual forma, encontrará el reporte en la carpeta de results/
5. Dentro de la carpeta de results, observará que se genera una carpeta por cada escenario más una carpeta con el formato results_yy_mm_dd_hh_mm_ss. Dentro de esa carpeta encontrará el archivo index.html con el reporte de ejecución.

# Semana 05
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
