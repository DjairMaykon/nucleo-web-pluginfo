onToggleTheme();

function onToggleTheme() {
  var checkBox = document.getElementById("toogle-mode-button");

  if (checkBox.checked == true) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

function closeMenu() {
  var checkBox = document.getElementById("toogle-menu-checkbox");
  checkBox.checked = false;
}
