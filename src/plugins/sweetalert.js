import Swal from 'sweetalert2';

// Базовые стили SweetAlert2 (важно импортировать их!)
import 'sweetalert2/dist/sweetalert2.min.css';

export default {
  install: (app) => {
    // Делаем Swal доступным как $swal в компонентах
    app.config.globalProperties.$swal = Swal;
  }
};