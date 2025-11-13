/* Script.js - Versión fusionada
   - Mantiene tu carga de secciones (switch + fetch) que ya funcionaba.
   - Añade: modo oscuro (toggle + detección sistema + localStorage).
   - Añade: simulador ejecutable (JS en iframe sandbox, Python con Skulpt si está disponible).
   - Añade: guardado por problema y historial (localStorage).
   - Compatibilidad con dos sets de IDs (viejos y nuevos).
*/

/* -------------------- Array de problemas (usa tu array completo) -------------------- */
/* He copiado el array completo tal como lo tenías en tu script funcional */
const problems = [
    { id: 0, title: "1. Suma de Dos Números", description: "Escribe un programa que sume dos números enteros ingresados por el usuario.", exampleInput: "5 3", expectedOutput: "8", hint: "Usa parseInt para convertir strings a números y suma con +." },
    { id: 1, title: "2. Factorial de un Número", description: "Calcula el factorial de un número entero positivo (n!).", exampleInput: "5", expectedOutput: "120", hint: "Usa un bucle for o recursión. Recuerda que 0! = 1." },
    { id: 2, title: "3. Secuencia de Fibonacci", description: "Genera los primeros n términos de la secuencia de Fibonacci.", exampleInput: "6", expectedOutput: "0 1 1 2 3 5", hint: "Inicializa con fib[0]=0, fib[1]=1 y usa un bucle para calcular el resto." },
    { id: 3, title: "4. Búsqueda Lineal", description: "Busca un elemento en un array y devuelve su índice (o -1 si no existe).", exampleInput: "3 1 4 1 5 9 2 6 target:7", expectedOutput: "-1", hint: "Itera el array con un for y compara cada elemento con el target." },
    { id: 4, title: "5. Ordenamiento Burbuja", description: "Ordena un array de números usando el algoritmo Burbuja.", exampleInput: "5 3 8 4 2", expectedOutput: "2 3 4 5 8", hint: "Usa dos bucles anidados: externo para pasadas, interno para comparaciones adyacentes." },
    { id: 5, title: "6. Máximo en un Array", description: "Encuentra el valor máximo en un array de números enteros.", exampleInput: "7 2 9 1 5 3", expectedOutput: "9", hint: "Inicializa max con el primer elemento y compara con el resto en un bucle." },
    { id: 6, title: "7. Verificar Palíndromo", description: "Determina si una cadena es un palíndromo (lee igual al revés, ignorando mayúsculas).", exampleInput: "radar", expectedOutput: "Sí", hint: "Compara la cadena con su reversa usando split('').reverse().join('')." },
    { id: 7, title: "8. Suma de Números Pares", description: "Suma todos los números pares en un rango de 1 a n.", exampleInput: "10", expectedOutput: "30", hint: "Usa un bucle for de 1 a n, verifica if (i % 2 === 0) y suma." },
    { id: 8, title: "9. Búsqueda Binaria", description: "Busca un elemento en un array ORDENADO y devuelve su índice (o -1).", exampleInput: "1 3 5 7 9 target:5", expectedOutput: "2", hint: "Usa low=0, high=longitud-1, y calcula mid en un while (low <= high)." },
    { id: 9, title: "10. Inversión de Cadena", description: "Invierte una cadena de texto.", exampleInput: "hola", expectedOutput: "aloh", hint: "Usa split('').reverse().join('')." },
    { id: 10, title: "11. Conteo de Vocales", description: "Cuenta las vocales en una cadena.", exampleInput: "programacion", expectedOutput: "5", hint: "Itera la cadena y verifica si es a,e,i,o,u (case insensitive)." },
    { id: 11, title: "12. Número Primo o No Primo", description: "Determina si un número es primo.", exampleInput: "7", expectedOutput: "Primo", hint: "Verifica divisores desde 2 hasta sqrt(n)." },
    { id: 12, title: "13. Promedio de Calificaciones", description: "Calcula el promedio de una lista de calificaciones.", exampleInput: "85 90 78", expectedOutput: "84.33", hint: "Suma y divide por la cantidad." },
    { id: 13, title: "14. Contar Números Negativos y Positivos", description: "Cuenta positivos y negativos en un array.", exampleInput: "1 -2 3 -4", expectedOutput: "Positivos: 2, Negativos: 2", hint: "Usa contadores en un bucle." },
    { id: 14, title: "15. Conversión de Grados Celsius a Fahrenheit", description: "Convierte temperatura de C a F.", exampleInput: "25", expectedOutput: "77", hint: "Fórmula: (C * 9/5) + 32." },
    { id: 15, title: "16. Suma de Dígitos de un Número", description: "Suma los dígitos de un número entero.", exampleInput: "123", expectedOutput: "6", hint: "Convierte a string y suma cada dígito." },
    { id: 16, title: "17. Determinar Año Bisiesto", description: "Verifica si un año es bisiesto.", exampleInput: "2024", expectedOutput: "Sí", hint: "Divisible por 4, no por 100 a menos que por 400." },
    { id: 17, title: "18. Calcular Potencia (Base^Exponente)", description: "Calcula base elevada a exponente.", exampleInput: "2 3", expectedOutput: "8", hint: "Usa Math.pow o un bucle." },
    { id: 18, title: "19. Invertir un Arreglo", description: "Invierte el orden de un array.", exampleInput: "1 2 3 4", expectedOutput: "4 3 2 1", hint: "Usa reverse() o un bucle." },
    { id: 19, title: "20. Contar Palabras en una Frase", description: "Cuenta las palabras en una frase.", exampleInput: "Hola mundo desde UAMM", expectedOutput: "4", hint: "Divide por espacios y cuenta." }
];

/* -------------------- Helpers para IDs (compatibilidad) -------------------- */
/* Devuelve el primer elemento existente entre varias opciones de id */
function $el(...ids) {
  for (let id of ids) {
    const e = document.getElementById(id);
    if (e) return e;
  }
  return null;
}

/* -------------------- Login & DOMContentLoaded (uniendo ambas versiones) -------------------- */
document.addEventListener('DOMContentLoaded', () => {
  // Login (usa la versión que me dijiste que funciona)
  const loginForm = document.getElementById('login-form');
  const modal = document.getElementById('login-modal');
  const userType = document.getElementById('user-type');
  const codeInput = document.getElementById('code');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const type = userType.value;
      const code = codeInput.value;
      if (type === 'estudiante' && code === 'ISC2023') {
        if (modal) modal.style.display = 'none';
        alert('¡Acceso completo como estudiante! ¡Sigue aprendiendo!');
        showSection('guia');
      } else if (type === 'visitante') {
        if (modal) modal.style.display = 'none';
        alert('Acceso limitado como visitante. Explora la guía y recursos.');
        const simBtn = document.querySelector('button[onclick="showSection(\'simulador\')"]');
        if (simBtn) simBtn.style.display = 'none';
        showSection('guia');
      } else {
        alert('Código incorrecto. Intenta de nuevo.');
      }
    });
  }

  // Sincronizar tema (si está el toggle en DOM)
  loadTheme();

  // Si se abre simulador.html directamente (no inyectado), inicializar
  if (document.querySelector('#problem-select')) {
    // si el simulador está en el DOM al cargar
    populateProblemSelect();
    attachSimulatorButtons();
  }
});

/* -------------------- showSection (mantener tu lógica que funciona + logging) -------------------- */
function showSection(section) {
  const main = document.getElementById('main-content');
  if (!main) {
    console.error('showSection: elemento #main-content no encontrado');
    return;
  }

  // Limpia e indicador
  main.innerHTML = `<div class="section active" style="padding:20px; text-align:center;">Cargando ${section}...</div>`;
  console.log('showSection llamado con:', section);

  // Usamos switch tal como en tu script que funciona
  switch(section) {
    case 'guia':
      fetch('guia.html')
        .then(resp => {
          console.log('fetch guia.html ->', resp.status);
          if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
          return resp.text();
        })
        .then(data => {
          main.innerHTML = data;
          const loadedSection = main.querySelector('.section');
          if (loadedSection) loadedSection.classList.add('active');
        })
        .catch(err => {
          console.error('Error cargando guía:', err);
          main.innerHTML = `<div class="error-message section active">Error cargando guia.html: ${err.message}</div>`;
        });
      break;

    case 'simulador':
      fetch('simulador.html')
        .then(resp => {
          console.log('fetch simulador.html ->', resp.status);
          if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
          return resp.text();
        })
        .then(data => {
          main.innerHTML = data;
          const loadedSection = main.querySelector('.section');
          if (loadedSection) loadedSection.classList.add('active');
          // inicializa elementos del simulador inyectado
          setTimeout(() => {
            populateProblemSelect();
            attachSimulatorButtons();
            applyCurrentThemeToDOM();
          }, 50);
        })
        .catch(err => {
          console.error('Error cargando simulador:', err);
          main.innerHTML = `<div class="error-message section active">Error cargando simulador.html: ${err.message}</div>`;
        });
      break;

    case 'recursos':
      fetch('recursos.html')
        .then(resp => {
          console.log('fetch recursos.html ->', resp.status);
          if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
          return resp.text();
        })
        .then(data => {
          main.innerHTML = data;
          const loadedSection = main.querySelector('.section');
          if (loadedSection) loadedSection.classList.add('active');
        })
        .catch(err => {
          console.error('Error cargando recursos:', err);
          main.innerHTML = `<div class="error-message section active">Error cargando recursos.html: ${err.message}</div>`;
        });
      break;

    case 'acerca':
      fetch('acerca.html')
        .then(resp => {
          console.log('fetch acerca.html ->', resp.status);
          if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
          return resp.text();
        })
        .then(data => {
          main.innerHTML = data;
          const loadedSection = main.querySelector('.section');
          if (loadedSection) loadedSection.classList.add('active');
        })
        .catch(err => {
          console.error('Error cargando acerca:', err);
          main.innerHTML = `<div class="error-message section active">Error cargando acerca.html: ${err.message}</div>`;
        });
      break;

    case 'autores':
      fetch('autores.html')
        .then(resp => {
          console.log('fetch autores.html ->', resp.status);
          if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
          return resp.text();
        })
        .then(data => {
          main.innerHTML = data;
          const loadedSection = main.querySelector('.section');
          if (loadedSection) loadedSection.classList.add('active');
        })
        .catch(err => {
          console.error('Error cargando autores:', err);
          main.innerHTML = `<div class="error-message section active">Error cargando autores.html: ${err.message}</div>`;
        });
      break;

    default:
      main.innerHTML = '<p class="section active">Sección no disponible aún.</p>';
  }

  // Oculta cualquier sección estática si existe (compatibilidad visual)
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
}

/* -------------------- exitApp -------------------- */
function exitApp() {
  if (confirm('¿Estás seguro de que quieres salir?')) {
    window.close();
  }
}

/* -------------------- Simulador: populate, loadProblem (compatible ambos IDs) -------------------- */
function populateProblemSelect() {
  // Soportar select con id 'problem-select' o 'problem-select' ya usado en ambos
  const select = $el('problem-select');
  if (!select) return;
  select.innerHTML = '';
  problems.forEach((p, i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = p.title;
    select.appendChild(opt);
  });
  loadProblem();
}

function loadProblem() {
  const select = $el('problem-select');
  if (!select) return;
  const index = parseInt(select.value || '0', 10);
  const problem = problems[index] || problems[0];

  // Actualizar en cualquiera de los ids presentes
  const titleEl = $el('current-problem');
  if (titleEl) titleEl.textContent = problem.title;

  const desc = $el('problem-description');
  if (desc) desc.textContent = problem.description;

  const inputPlaceholderEl = $el('stdin-input', 'input-data');
  if (inputPlaceholderEl) inputPlaceholderEl.placeholder = `Ej: ${problem.exampleInput}`;

  const codeArea = $el('code-input', 'code-editor');
  if (codeArea) codeArea.value = loadSavedCodeForProblem(index) ?? defaultTemplateForLang();

  // esconder output si existe
  const outSection = $el('output-section');
  if (outSection) outSection.style.display = 'none';

  // reset campos nuevos
  const outArea = $el('output-area', 'output');
  if (outArea) outArea.textContent = 'Esperando ejecución...';
  const expected = $el('expected-output');
  if (expected) expected.textContent = 'N/A';
  const outRes = $el('output-code-result');
  if (outRes) outRes.textContent = 'N/A';
  const feedback = $el('feedback');
  if (feedback) { feedback.textContent = ''; feedback.style.color = ''; }

  refreshHistoryList();
}

function defaultTemplateForLang() {
  const langSel = $el('lang-select');
  const lang = langSel ? langSel.value : 'js';
  return lang === 'py' ? '# Escribe tu código en Python\n' : '// Escribe tu código en JavaScript\n';
}

/* -------------------- Guardado por problema -------------------- */
function saveCodeForProblem() {
  const select = $el('problem-select');
  const index = select ? parseInt(select.value || '0', 10) : 0;
  const codeArea = $el('code-input', 'code-editor');
  const code = codeArea ? codeArea.value : '';
  localStorage.setItem(`sim_code_problem_${index}`, code);
  alert('Código guardado localmente para ' + (problems[index]?.title || 'Problema'));
}

function loadSavedCodeForProblem(index) {
  try {
    return localStorage.getItem(`sim_code_problem_${index}`);
  } catch (e) {
    console.error('Error loadSavedCodeForProblem', e);
    return null;
  }
}

function loadSavedCodeButton() {
  const select = $el('problem-select');
  const index = select ? parseInt(select.value || '0', 10) : 0;
  const code = loadSavedCodeForProblem(index);
  const codeArea = $el('code-input', 'code-editor');
  if (codeArea) {
    if (code !== null) {
      codeArea.value = code;
      alert('Código guardado cargado para ' + problems[index].title);
    } else alert('No hay código guardado para este problema.');
  }
}

/* -------------------- Historial -------------------- */
function pushHistory(entry) {
  const key = 'sim_history';
  const raw = localStorage.getItem(key);
  const arr = raw ? JSON.parse(raw) : [];
  arr.unshift(entry);
  if (arr.length > 10) arr.splice(10);
  localStorage.setItem(key, JSON.stringify(arr));
  refreshHistoryList();
}

function refreshHistoryList() {
  const key = 'sim_history';
  const raw = localStorage.getItem(key);
  const arr = raw ? JSON.parse(raw) : [];
  const list = $el('history-list');
  if (!list) return;
  list.innerHTML = '';
  arr.forEach((h, idx) => {
    const li = document.createElement('li');
    li.style.display = 'flex';
    li.style.justifyContent = 'space-between';
    li.style.alignItems = 'center';
    li.innerHTML = `<div style="flex:1"><strong>${problems[h.problemId]?.title || 'Problema'}</strong><br/><small>${new Date(h.timestamp).toLocaleString()}</small></div>
                    <div style="display:flex;gap:6px">
                      <button onclick="loadHistory(${idx})">Cargar</button>
                      <button onclick="deleteHistoryIndex(${idx})">Borrar</button>
                    </div>`;
    list.appendChild(li);
  });
}

function loadHistory(index) {
  const raw = localStorage.getItem('sim_history');
  const arr = raw ? JSON.parse(raw) : [];
  const entry = arr[index];
  if (!entry) return;
  const sel = $el('problem-select');
  if (sel) sel.value = entry.problemId;
  loadProblem();
  const saved = loadSavedCodeForProblem(entry.problemId);
  const codeArea = $el('code-input', 'code-editor');
  if (saved !== null && codeArea) codeArea.value = saved;
}

function deleteHistoryIndex(idx) {
  const key = 'sim_history';
  const raw = localStorage.getItem(key);
  const arr = raw ? JSON.parse(raw) : [];
  arr.splice(idx, 1);
  localStorage.setItem(key, JSON.stringify(arr));
  refreshHistoryList();
}

/* -------------------- Ejecución de código (JS sandbox + Skulpt) -------------------- */
function runCode() {
  // recolecta valores, considerando ambos conjuntos de ids
  const codeArea = $el('code-input', 'code-editor');
  const stdinEl = $el('stdin-input', 'input-data');
  const timeoutEl = $el('timeout');
  const langSel = $el('lang-select');
  const problemSel = $el('problem-select');

  const code = codeArea ? codeArea.value : '';
  const stdin = stdinEl ? stdinEl.value : '';
  const timeout = timeoutEl ? parseInt(timeoutEl.value || '2000', 10) : 2000;
  const lang = langSel ? langSel.value : 'js';
  const pIndex = problemSel ? parseInt(problemSel.value || '0', 10) : 0;
  const problem = problems[pIndex];

  // setear UI preliminar
  const outArea = $el('output-area', 'output');
  if (outArea) outArea.textContent = 'Ejecutando...';
  const expectedEl = $el('expected-output');
  if (expectedEl) expectedEl.textContent = problem.expectedOutput || 'N/A';
  const outRes = $el('output-code-result');
  if (outRes) outRes.textContent = 'Procesando...';
  const feedbackEl = $el('feedback');
  if (feedbackEl) feedbackEl.textContent = '';

  if (lang === 'js') {
    runJSInSandbox(code, stdin, timeout)
      .then(result => handleRunResult(pIndex, lang, code, stdin, result))
      .catch(err => { showRunError(err); pushHistoryEntry(pIndex, lang, 'error:' + err.message); });
  } else if (lang === 'py') {
    runPythonSkulpt(code, stdin, timeout)
      .then(result => handleRunResult(pIndex, lang, code, stdin, result))
      .catch(err => { showRunError(err); pushHistoryEntry(pIndex, lang, 'error:' + err.message); });
  } else {
    alert('Lenguaje no soportado.');
  }
}

function handleRunResult(problemIndex, lang, code, input, resultText) {
  const problem = problems[problemIndex] || {};
  const expected = (problem.expectedOutput || '').toString().trim();
  const actual = (resultText || '').toString().trim();

  const outArea = $el('output-area', 'output');
  if (outArea) outArea.textContent = actual || '(sin salida)';
  const outRes = $el('output-code-result');
  if (outRes) outRes.textContent = actual || 'N/A';

  const success = expected && expected !== 'N/A' ? (actual === expected) : false;
  const feedback = $el('feedback');
  if (feedback) {
    feedback.textContent = success ? '¡Correcto! La salida coincide con la esperada.' : 'Salida distinta a la esperada.';
    feedback.style.color = success ? 'green' : 'red';
  }

  pushHistoryEntry(problemIndex, lang, success ? 'OK' : `Salida: ${actual}`);
}

function pushHistoryEntry(problemId, lang, resultSummary) {
  pushHistory({ problemId, lang, timestamp: Date.now(), resultSummary });
}

function showRunError(err) {
  const outArea = $el('output-area', 'output');
  if (outArea) outArea.textContent = 'Error: ' + (err && err.message ? err.message : String(err));
  const fb = $el('feedback');
  if (fb) { fb.textContent = 'Error en ejecución.'; fb.style.color = 'red'; }
}

/* Ejecutar JS en iframe sandbox (captura console.log) */
function runJSInSandbox(userCode, stdin, timeout = 2000) {
  return new Promise((resolve, reject) => {
    try {
      const html = `
        <!doctype html><html><body>
        <script>
          (function(){
            const out = [];
            console.log = function(){ out.push(Array.from(arguments).join(' ')); };
            console.error = function(){ out.push('ERROR: ' + Array.from(arguments).join(' ')); };
            const stdin = ${JSON.stringify(stdin || '')};
            try {
              const userFunc = new Function('stdin', \`
                try { \${userCode} } catch(e) { console.error('RuntimeError:', e && e.message ? e.message : e); throw e; }
              \`);
              userFunc(stdin);
            } catch(e) {
              out.push('RUNTIME_EXCEPTION: ' + (e && e.message ? e.message : String(e)));
            }
            parent.postMessage({type:'sandbox_output', output: out.join('\\n')}, '*');
          })();
        <\/script>
        </body></html>`;
      const blob = new Blob([html], {type:'text/html'});
      const url = URL.createObjectURL(blob);
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.sandbox = 'allow-scripts';
      iframe.src = url;

      let resolved = false;
      function cleanup() { try { document.body.removeChild(iframe); } catch(e){} URL.revokeObjectURL(url); window.removeEventListener('message', onMessage); }
      function onMessage(e) {
        if (!e.data || e.data.type !== 'sandbox_output') return;
        if (resolved) return;
        resolved = true;
        cleanup();
        resolve(e.data.output);
      }
      window.addEventListener('message', onMessage);
      document.body.appendChild(iframe);

      setTimeout(() => {
        if (!resolved) { resolved = true; cleanup(); reject(new Error('Tiempo de ejecución agotado (timeout).')); }
      }, timeout);

    } catch (e) { reject(e); }
  });
}

/* Ejecutar Python con Skulpt (si está cargado) */
function runPythonSkulpt(code, stdin, timeout = 3000) {
  return new Promise((resolve, reject) => {
    if (typeof Sk === 'undefined') return reject(new Error('Skulpt no está cargado. Incluye skulpt si quieres Python.'));
    const outArea = $el('output-area', 'output');
    if (outArea) outArea.textContent = '';
    Sk.configure({
      output: function(text) { const a = $el('output-area', 'output'); if (a) a.textContent += text; },
      read: function(x) { if (Sk.builtinFiles === undefined || Sk.builtinFiles['files'][x] === undefined) throw new Error("File not found: " + x); return Sk.builtinFiles['files'][x]; },
      inputfun: function(prompt) { return stdin; },
      inputfunTakesPrompt: true
    });
    const promise = Sk.misceval.asyncToPromise(function() { return Sk.importMainWithBody('<stdin>', false, code, true); });
    let finished = false;
    const to = setTimeout(() => { if (!finished) { finished = true; reject(new Error('Timeout Python')); } }, timeout);
    promise.then(mod => { if (finished) return; finished = true; clearTimeout(to); const t = $el('output-area','output')?.textContent || ''; resolve(t); }, err => { if (finished) return; finished = true; clearTimeout(to); reject(err); });
  });
}

/* -------------------- Botones y Attach (soporta ambos conjuntos de ids) -------------------- */
function attachSimulatorButtons() {
  const runBtn = $el('run-btn', 'run-button'); // 'run-button' fallback
  if (runBtn) runBtn.onclick = runCode;

  const saveBtn = $el('save-btn');
  if (saveBtn) saveBtn.onclick = saveCodeForProblem;

  const loadSavedBtn = $el('load-saved-btn');
  if (loadSavedBtn) loadSavedBtn.onclick = loadSavedCodeButton;

  const hintBtn = $el('show-hint-btn');
  if (hintBtn) hintBtn.onclick = showHint;

  const langSelect = $el('lang-select');
  if (langSelect) langSelect.onchange = () => { const c = $el('code-input','code-editor'); if (c && c.value.trim()==='') c.value = defaultTemplateForLang(); };

  const problemSelect = $el('problem-select');
  if (problemSelect) problemSelect.onchange = loadProblem;

  refreshHistoryList();
}

/* -------------------- showHint (compatibilidad) -------------------- */
function showHint() {
  const select = $el('problem-select');
  const idx = select ? parseInt(select.value || '0', 10) : 0;
  const problem = problems[idx];
  alert(problem?.hint || 'Sin pista disponible.');
}

/* -------------------- Tema oscuro (toggle + detección sistema) -------------------- */
function toggleTheme() {
  const body = document.body;
  const next = !body.classList.contains('dark-mode');
  body.classList.toggle('dark-mode', next);
  localStorage.setItem('theme', next ? 'dark' : 'light');
  syncThemeIcon();
}

function loadTheme() {
  const stored = localStorage.getItem('theme');
  if (stored === 'dark') document.body.classList.add('dark-mode');
  else if (stored === 'light') document.body.classList.remove('dark-mode');
  else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.classList.toggle('dark-mode', prefersDark);
  }
  syncThemeIcon();
}

function applyCurrentThemeToDOM() {
  // llamada después de inyectar dom del simulador
  syncThemeIcon();
}

function syncThemeIcon() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const icon = btn.querySelector('i');
  if (!icon) return;
  const isDark = document.body.classList.contains('dark-mode');
  icon.classList.remove('fa-moon','fa-sun');
  icon.classList.add(isDark ? 'fa-sun' : 'fa-moon');
}
function mostrarSemestre(num) {
  const info = document.getElementById('info-semestre');
  const data = {
    1: "C++ (Básico)",
    2: "C y C++",
    3: "Java y HTML",
    4: "HTML",
    5: "Python, Nube e, Java",
    6: "Python",
    7: "C#",
    8: "C#, Java, Python",
    9: "Todos los anteriores lenguajes vistos (C++, C, Java, HTML, Python, C#, Nube e)"
  };

  if (info) {
    info.innerHTML = `
      <h3>${num}° Semestre</h3>
      <p><strong>Lenguajes / Temas:</strong> ${data[num]}</p>
    `;
  } else {
    console.warn("No se encontró el elemento info-semestre en el simulador.");
  }
}

window.toggleTheme = toggleTheme;
window.loadTheme = loadTheme;
window.showSection = showSection;
window.exitApp = exitApp;
window.populateProblemSelect = populateProblemSelect;
window.loadProblem = loadProblem;
window.runCode = runCode;
window.showHint = showHint;
window.saveCodeForProblem = saveCodeForProblem;
window.loadSavedCodeButton = loadSavedCodeButton;
window.attachSimulatorButtons = attachSimulatorButtons;
window.refreshHistoryList = refreshHistoryList;

/* -------------------- Inicialización: asegurar icono del tema (por si el botón ya existe) -------------------- */
try { loadTheme(); } catch(e){ console.warn('loadTheme error', e); }
