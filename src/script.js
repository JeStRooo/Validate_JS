document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);
  const password = document.querySelector('#password');
  const repeatPassword = document.querySelector('#repeatPassword');
  function formSend(e) {
    e.preventDefault();
    let error = formValidate(form);
    if (error === 0) {
      form.classList.add('_sending')
    } else {
      alert(error.join('\n'))
    }
  }
  function formValidate(form) {
    let error = [];
    let formReq = document.querySelectorAll('._req');
    formReq.forEach( (input) => {
      formRemoveError(input);
      if (input.classList.contains('_name') && nameTest(input)) {
        formAddError(input);
        error.push('Вы неправильно ввели имя!');
      } else if (input.classList.contains('_first-name') && nameTest(input)) {
        formAddError(input);
        error.push('Вы неправильно ввели фамилию!');
      } else if (input.classList.contains('_email') && emailTest(input)) {
        formAddError(input);
        error.push('Вы неправильно ввели почту!');
      } else if (input.classList.contains('_password') && passwordTest(input)) {
        formAddError(input);
        error.push('Вы неправильно ввели пароль!');
      } else if (repeatPassword.value !== password.value) {
        formAddError(input);
        error.push('Пароли не совпадают!');
      } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
        formAddError(input);
        error.push('Вы не согласились с условиями пользования!');
      } else {
        if (input.value === '') {
          formAddError(input);
          error.push('Вы не заполнили поле!');
        }
      }
    })
    return error;
  }
  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }
  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }
  function nameTest(input) {
    return !/^(?=.{1,40}$)[а-яёА-ЯЁ]+(?:[-' ][а-яёА-ЯЁ]+)*$/.test(input.value)
  }
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
  }
  function passwordTest(input) {
    return !/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(input.value)
  }
})