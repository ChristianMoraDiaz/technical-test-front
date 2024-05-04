
<a name="readme-top"></a>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Tabla de contenido</summary>
  <ol>
    <li>
      <a href="#acerca-del-proyecto">Acerca del proyecto</a>
      <ul>
        <li><a href="#stack">Stack</a></li>
      </ul>
    </li>
    <li>
      <a href="#primeros-pasos">Primeros Pasos</a>
    </li>
    <li><a href="#explicación">Explicación</a></li>
    <li><a href="#contacto">Contacto</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## Acerca del proyecto

La implementación se enfoca en garantizar la integridad de los datos, la flexibilidad en la estructura organizativa y la coherencia en la jerarquía de la organización. Esto se logra mediante la definición clara de la estructura de datos y el manejo adecuado de las relaciones entre los empleados, así como mediante la validación y el cumplimiento de las responsabilidades de supervisión según los roles de cada empleado.

<p align="right">(<a href="#readme-top">Regresar arriba</a>)</p>



### Stack

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![Typescript][Typescript]][Typescript-url]
* [![Tailwind][Tailwind]][Tailwind-url]
  
<p align="right">(<a href="#readme-top">Regresar arriba</a>)</p>



<!-- GETTING STARTED -->
## Primeros Pasos

Ejecuta el servidor de desarrollo:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

Puedes empezar a editar la página modificando app/page.tsx. La página se actualizará automáticamente a medida que edites el archivo.

Este proyecto utiliza next/font para optimizar y cargar automáticamente Inter, una fuente personalizada de Google.

<!-- ROADMAP -->
## Explicación

* Estructura de Datos:

    - [ ] id: Este campo es de tipo Int y se utiliza como identificador único de cada empleado en la base de datos. Está marcado con @id, lo que significa que es la clave primaria de la tabla Employee. Además, tiene la directiva @default(autoincrement()), lo que indica que su valor se generará automáticamente y se incrementará automáticamente con cada nuevo registro.
    
    - [ ] name: Este campo es de tipo String y almacena el nombre del empleado.
    
    - [ ] version: Este campo es de tipo Int y se utiliza para llevar un control de versiones de los datos del empleado. Está marcado con @default(1), lo que significa que su valor predeterminado es 1.
    
    - [ ] supervisor: Este campo establece una relación de uno a uno con otro empleado, que actúa como el supervisor de este empleado. Está marcado como opcional (Employee?) porque no todos los empleados pueden tener un supervisor. La directiva @relation     especifica el nombre de la relación como "Subordinates", y los campos y referencias especifican cómo se relaciona este campo con el campo id en la misma tabla.
    
    - [ ] supervisorId: Este campo es de tipo Int y almacena el ID del supervisor del empleado. Es un campo de clave foránea que se relaciona con el campo id de la misma tabla Employee.
    
    - [ ] subordinates: Este campo establece una relación de uno a muchos con otros empleados que son subordinados de este empleado. Está marcado como un array (Employee[]) porque un empleado puede tener múltiples subordinados. Al igual que el campo supervisor, utiliza la directiva @relation("Subordinates") para especificar el nombre de la relación.
    
    - [ ] director: Este campo es de tipo Boolean y se utiliza para indicar si el empleado es un director o no. Está marcado con @default(false), lo que significa que su valor predeterminado es false.

* Escenario de Actualización:

    - [ ] Validación de entrada: El servicio comienza validando los datos de entrada utilizando la función validationResult proporcionada por el paquete express-validator. Si se encuentran errores de validación, se devuelve una respuesta de estado 400 con los errores encontrados.

    - [ ] Obtención del ID del empleado: El ID del empleado que se va a actualizar se obtiene del parámetro de la solicitud.

    - [ ] Búsqueda del empleado existente: Utilizando el ORM Prisma, se busca el empleado existente en la base de datos con el ID proporcionado.

    - [ ] Comprobación de existencia del empleado: Si no se encuentra ningún empleado con el ID proporcionado, se devuelve una respuesta de estado 404 con un mensaje indicando que el empleado no fue encontrado.

    - [ ] Actualización del supervisor (si es necesario): Si se proporciona un nuevo supervisor para el empleado y este es diferente al supervisor actual, se incrementa el número de versión del empleado existente y se actualiza el campo director del nuevo supervisor a true.

    - [ ] Actualización del empleado: Se actualiza el empleado en la base de datos con los datos proporcionados en el cuerpo de la solicitud. Se utiliza el método update proporcionado por Prisma.

    - [ ] Actualización del estado de director del supervisor anterior (si es necesario): Si el empleado tenía un supervisor anterior y ya no tiene subordinados, se actualiza el campo director del supervisor anterior a false.

    - [ ] Respuesta exitosa: Se devuelve una respuesta JSON con los datos del empleado actualizados.

    - [ ] Manejo de errores: En caso de cualquier error durante el proceso de actualización, se captura y se devuelve una respuesta de estado 500 con un mensaje indicando que hubo un error en el proceso de actualización.

Este proceso garantiza que la actualización de los empleados se realice de manera segura y consistente, manteniendo la integridad de los datos y la coherencia en la jerarquía de la organización.

* Manejo de Nulos:
    - [ ] La estructura jerárquica en esta aplicación está basada en la validación del rol de director. La lógica detrás de esta validación es que un empleado que es designado como director puede tener la opción de tener o no tener un supervisor, dependiendo de las necesidades y la estructura organizativa de la empresa. Por otro lado, un empleado que no ocupa el rol de director debe tener obligatoriamente un supervisor designado.

    La razón para esta distinción radica en la naturaleza de los roles dentro de una organización:

    - [ ] Rol de director: Los directores suelen ser responsables de supervisar y dirigir equipos o áreas específicas dentro de la empresa. En algunos casos, pueden operar de manera más autónoma, sin tener un supervisor directo, especialmente si están a cargo de áreas estratégicas o proyectos importantes.

    - [ ] Empleados no supervisores: Por otro lado, los empleados que no ocupan roles de director generalmente requieren la supervisión y el apoyo de un supervisor para guiar su trabajo, asignar tareas, proporcionar retroalimentación y evaluar su desempeño. Esta estructura de supervisión es fundamental para mantener la coordinación, la eficiencia y la coherencia en el trabajo diario.

    - [ ] En resumen, la distinción entre empleados que pueden tener o no un supervisor se basa en el rol de director. Esto permite flexibilidad en la estructura organizativa, al tiempo que garantiza que los empleados no supervisores reciban el apoyo y la orientación necesarios para cumplir con sus responsabilidades de manera efectiva.


<p align="right">(<a href="#readme-top">Regresar arriba</a>)</p>


<!-- CONTACT -->
## Contacto

Christian David Mora Diaz - christianmoradiaz@hotmail.com - (+57) 3013913002

<p align="right">(<a href="#readme-top">Regresar arriba</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Typescript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org
[Tailwind]: https://camo.githubusercontent.com/1bb293c7e2061cb31d8d49ce762a23200cab1b99350e904a9fe24cb5dadf3eb7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f7374796c652d7461696c77696e646373732d333842324142
[Tailwind-url]: https://tailwindcss.com
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
