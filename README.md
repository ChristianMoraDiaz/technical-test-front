
<a name="readme-top"></a>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#explanation">Explnation</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

La implementación se enfoca en garantizar la integridad de los datos, la flexibilidad en la estructura organizativa y la coherencia en la jerarquía de la organización. Esto se logra mediante la definición clara de la estructura de datos y el manejo adecuado de las relaciones entre los empleados, así como mediante la validación y el cumplimiento de las responsabilidades de supervisión según los roles de cada empleado.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![Typescript][Typescript]][Typescript-url]
* [![Tailwind][Tailwind]][Tailwind-url]
  
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

<!-- ROADMAP -->
## Explanations

- [ ] Estructura de Datos:

    - [ ] id: Este campo es de tipo Int y se utiliza como identificador único de cada empleado en la base de datos. Está marcado con @id, lo que significa que es la clave primaria de la tabla Employee. Además, tiene la directiva @default(autoincrement()), lo que indica que su valor se generará automáticamente y se incrementará automáticamente con cada nuevo registro.
    
    - [ ] name: Este campo es de tipo String y almacena el nombre del empleado.
    
    version: Este campo es de tipo Int y se utiliza para llevar un control de versiones de los datos del empleado. Está marcado con @default(1), lo que significa que su valor predeterminado es 1.
    
    - [ ] supervisor: Este campo establece una relación de uno a uno con otro empleado, que actúa como el supervisor de este empleado. Está marcado como opcional (Employee?) porque no todos los empleados pueden tener un supervisor. La directiva @relation especifica el nombre de la relación como "Subordinates", y los campos y referencias especifican cómo se relaciona este campo con el campo id en la misma tabla.
    
    - [ ] supervisorId: Este campo es de tipo Int y almacena el ID del supervisor del empleado. Es un campo de clave foránea que se relaciona con el campo id de la misma tabla Employee.
    
    - [ ] subordinates: Este campo establece una relación de uno a muchos con otros empleados que son subordinados de este empleado. Está marcado como un array (Employee[]) porque un empleado puede tener múltiples subordinados. Al igual que el campo supervisor, utiliza la directiva @relation("Subordinates") para especificar el nombre de la relación.
    
    - [ ] director: Este campo es de tipo Boolean y se utiliza para indicar si el empleado es un director o no. Está marcado con @default(false), lo que significa que su valor predeterminado es false.

- [ ] Escenario de Actualización:

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

- [ ] Manejo de Nulos:
    - [ ] La estructura jerárquica en esta aplicación está basada en la validación del rol de director. La lógica detrás de esta validación es que un empleado que es designado como director puede tener la opción de tener o no tener un supervisor, dependiendo de las necesidades y la estructura organizativa de la empresa. Por otro lado, un empleado que no ocupa el rol de director debe tener obligatoriamente un supervisor designado.

    La razón para esta distinción radica en la naturaleza de los roles dentro de una organización:

    Rol de director: Los directores suelen ser responsables de supervisar y dirigir equipos o áreas específicas dentro de la empresa. En algunos casos, pueden operar de manera más autónoma, sin tener un supervisor directo, especialmente si están a cargo de áreas estratégicas o proyectos importantes.

    Empleados no supervisores: Por otro lado, los empleados que no ocupan roles de director generalmente requieren la supervisión y el apoyo de un supervisor para guiar su trabajo, asignar tareas, proporcionar retroalimentación y evaluar su desempeño. Esta estructura de supervisión es fundamental para mantener la coordinación, la eficiencia y la coherencia en el trabajo diario.

    En resumen, la distinción entre empleados que pueden tener o no un supervisor se basa en el rol de director. Esto permite flexibilidad en la estructura organizativa, al tiempo que garantiza que los empleados no supervisores reciban el apoyo y la orientación necesarios para cumplir con sus responsabilidades de manera efectiva.


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Christian David Mora Diaz - christianmoradiaz@hotmail.com - (+57) 3013913002

Project Link: [https://github.com/github_username/repo_name](https://github.com/github_username/repo_name)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


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
[Tailwind]: https://cdn.iconscout.com/icon/free/png-512/free-tailwind-css-5285308-4406745.png?f=webp&w=256
[Tailwind-url]: https://tailwindcss.com
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
