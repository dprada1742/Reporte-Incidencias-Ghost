## Pruebas E2E
### Semana 05
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

*Debido a limitaciones de Kraken, no es posible ejecutar todos los features en una única ejecución, por esto se deben copiar los features que no se quieran ejecutar en una ubicación diferente a la que se encuentran actualmente.*


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
