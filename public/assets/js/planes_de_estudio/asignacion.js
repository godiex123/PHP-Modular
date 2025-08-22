document.addEventListener("DOMContentLoaded", () => {
  const subjectsContainer = document.getElementById("subjects");
  const categoriesContainer = document.getElementById("categories-container");
  const saveBtn = document.getElementById("saveBtn");
  let categories = {};

  function createSubjectElement(subjectId, subjectName) {
    const subjectElement = document.createElement("div");
    subjectElement.className = "subject";
    subjectElement.draggable = true;
    subjectElement.dataset.id = subjectId;
    subjectElement.textContent = subjectName;

    subjectElement.addEventListener("dragstart", () => {
      subjectElement.classList.add("dragging");
    });

    subjectElement.addEventListener("dragend", () => {
      subjectElement.classList.remove("dragging");
    });

    return subjectElement;
  }

  function createCategoryElement(categoryId, categoryName) {
    const categoryElement = document.createElement("div");
    categoryElement.className = "category";
    categoryElement.id = categoryId;
    categoryElement.textContent = categoryName;

    categoryElement.addEventListener("dragover", (event) => {
      event.preventDefault();
      categoryElement.classList.add("dragover");
    });

    categoryElement.addEventListener("dragleave", () => {
      categoryElement.classList.remove("dragover");
    });

    categoryElement.addEventListener("drop", () => {
      const draggingSubject = document.querySelector(".subject.dragging");
      if (draggingSubject) {
        categoryElement.classList.remove("dragover");
        categoryElement.appendChild(draggingSubject);
      }
    });

    return categoryElement;
  }

  function loadInitialData(id_decreto) {
    fetch(`mantenedores/planes_de_estudio/asignacion_action.php?id_decreto=${id_decreto}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Verifica si hay datos de categorías
        if (data.categorias) {
          // Crear y agregar las categorías
          categoriesContainer.innerHTML =
            '<div class="title">Salidas Intermedias</div>';
          data.categorias.forEach((categoria) => {
            const categoryElement = createCategoryElement(
              categoria.id_salida,
              categoria.descripcion
            );
            categories[categoria.id_salida] = categoryElement;
            categoriesContainer.appendChild(categoryElement);
          });
        }

        // Verifica si hay datos de asignaturas
        if (data.asignaturas) {
          // Crear y agregar las asignaturas
          subjectsContainer.innerHTML = '<div class="title">Asignaturas</div>';
          data.asignaturas.forEach((asignatura) => {
            const subjectElement = createSubjectElement(
              asignatura.id_asignatura,
              asignatura.nombre_asignatura
            );
            if (asignatura.id_salida == null || asignatura.id_salida == 0) {
              subjectsContainer.appendChild(subjectElement);
            } else {
              const categoryElement = categories[asignatura.id_salida];
              if (categoryElement) {
                categoryElement.appendChild(subjectElement);
              }
            }
          });
        }
      })
      .catch((error) => {
        console.error("Error al cargar los datos:", error);
      });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const id_decreto = urlParams.get("id_decreto");
  if (id_decreto) {
    loadInitialData(id_decreto);
  }

  saveBtn.addEventListener("click", () => {
    const data = [];
    const categoryElements = document.querySelectorAll(".category");

    categoryElements.forEach((category) => {
      const subjectsInCategory = category.querySelectorAll(".subject");
      subjectsInCategory.forEach((subject) => {
        data.push({
          id_asignatura: subject.dataset.id,
          id_salida: category.id,
        });
      });
    });

    // Agregar asignaturas en la lista de espera
    const subjectsInWaitList = subjectsContainer.querySelectorAll(".subject");
    subjectsInWaitList.forEach((subject) => {
      data.push({
        id_asignatura: subject.dataset.id,
        id_salida: "Esperando",
      });
    });

    fetch(`mantenedores/planes_de_estudio/asignacion_action.php?id_decreto=${id_decreto}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          alert("Datos guardados con éxito.");
        } else {
          alert("Error al guardar los datos: " + result.message);
        }
      })
      .catch((error) => {
        console.error("Error al guardar los datos:", error);
      });
  });

  // Agregar eventos de arrastre para las categorías
  document.querySelectorAll(".category").forEach((category) => {
    category.addEventListener("dragover", (event) => {
      event.preventDefault();
      category.classList.add("dragover");
    });

    category.addEventListener("dragleave", () => {
      category.classList.remove("dragover");
    });

    category.addEventListener("drop", () => {
      const draggingSubject = document.querySelector(".subject.dragging");
      if (draggingSubject) {
        category.classList.remove("dragover");
        category.appendChild(draggingSubject);
      }
    });
  });

  // Agregar eventos de arrastre para la sección de espera
  subjectsContainer.addEventListener("dragover", (event) => {
    event.preventDefault();
    const draggingSubject = document.querySelector(".subject.dragging");
    if (draggingSubject) {
      subjectsContainer.classList.add("dragover");
    }
  });

  subjectsContainer.addEventListener("dragleave", () => {
    subjectsContainer.classList.remove("dragover");
  });

  subjectsContainer.addEventListener("drop", () => {
    const draggingSubject = document.querySelector(".subject.dragging");
    if (draggingSubject) {
      subjectsContainer.classList.remove("dragover");
      subjectsContainer.appendChild(draggingSubject);
    }
  });
});
