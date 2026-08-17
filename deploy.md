Paso 1: Fusión en Local (Hacia Develop)
    Asegúrate de tener todos los cambios confirmados (commit) y subidos (push) en tu rama feature/integracion-salesforce.

    Cambia a tu rama develop local usando git checkout develop.

    Actualiza tu rama para evitar conflictos con git pull origin develop.

    Fusiona tu nueva funcionalidad ejecutando git merge feature/integracion-salesforce.

    Sube los cambios consolidados al repositorio remoto con git push origin develop.

Paso 2: Validación en Dev (Panel Acquia)
    En tu panel de Acquia, ve al bloque del entorno Dev.

    Cambia el código (usando el botón de las flechas cruzadas) para que deje de apuntar a feature/integracion-salesforce y pase a trackear la rama develop.

    Conéctate por SSH o consola y limpia la caché ejecutando drush cr en ese entorno.

    Realiza una prueba técnica rápida para confirmar que la fusión no generó errores de regresión con el código existente.

Paso 3: Generación del Tag (Para Stage)
    Dado que Stage requiere un punto congelado en el tiempo, crea un tag desde tu rama develop ya validada.

    En tu terminal, crea el tag con una nomenclatura estándar: git tag -a 2026-08-12.salesforce_qa -m "Integracion Salesforce API".

    Sube este tag al servidor remoto ejecutando git push origin 2026-08-12.salesforce_qa.

Paso 4: Despliegue y Pruebas en Stage
    Ve al panel de Acquia y, en el entorno Stage, haz clic en el botón de cambio de código.

    Selecciona el tag que acabas de subir (tags/2026-08-12.salesforce_qa).

    Apenas termine el despliegue, ejecuta obligatoriamente un drush cr en Stage para que Drupal registre las nuevas rutas de tu API.

    Este es el momento de probar los formularios de principio a fin y validar que los datos llegan al Sandbox de Salesforce usando las variables de entorno de este servidor.

Paso 5: Despliegue en Producción (Prod)
    Si trabajas con una rama principal (main o master), haz el merge de develop hacia ella en tu repositorio por orden interno.

    Sin embargo, para desplegar en Acquia, debes ir al bloque de Prod y seleccionar exactamente el mismo tag que validaste en Stage (tags/2026-08-12.salesforce_qa). Esto garantiza que a Producción suba el mismo código que ya fue aprobado, byte por byte.

    Ejecuta un último drush cr en Producción.

    Realiza una prueba controlada con un lead de prueba para confirmar el correcto funcionamiento con las variables de entorno productivas.