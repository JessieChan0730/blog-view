import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

export class Toast {
  static success (msg:string) {
    Toastify({
      text: msg,
      duration: 3000,
      close: true,
      gravity: 'top',
      style:{
        backgroundColor: 'green',
      },
      position: 'right',
      stopOnFocus: true,
    }).showToast()
  }

  static warn (msg:string) {
    Toastify({
      text: msg,
      duration: 3000,
      close: true,
      gravity: 'top',
      style: {
        backgroundColor: 'yellow',
      },
      position: 'right',
      stopOnFocus: true,
    }).showToast()
  }

  static error (msg:string) {
    Toastify({
      text: msg,
      duration: 3000,
      close: true,
      gravity: 'top',
      position: 'right',
      style: {
        backgroundColor: '#f40',
      },
      stopOnFocus: true,
    }).showToast()
  }

  static info (msg:string) {
    Toastify({
      text: msg,
      duration: 3000,
      close: true,
      gravity: 'top',
      position: 'right',
      style: {
        backgroundColor: 'gray',
      },
      stopOnFocus: true,
    }).showToast()
  }
}
