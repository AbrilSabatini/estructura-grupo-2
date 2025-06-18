const { spawn } = require('child_process')
const fs = require('fs')
const readline = require('readline')
require('dotenv').config()
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
const runCommand = (command, args) => {
  const child = spawn(command, args, { stdio: 'inherit' })

  child.on('close', (code) => {
    if (code !== 0) {
      console.error(`❌ El proceso terminó con código ${code}`)
    }
  })
}
const ask = (question) =>
  new Promise((resolve) => rl.question(question, resolve))
// env mínimo esperado
const expectedEnv = {
  DATABASE_USER: 'root',
  DATABASE_NAME: 'product_master',
  DATABASE_HOST: 'mysql',
  AUTH_TOKEN:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30',
}
// si en el array hay elementos quiere decir que faltan o son inválidos
const missingOrInvalid = []

for (const [key, expectedValue] of Object.entries(expectedEnv)) {
  const actualValue = process.env[key]
  if (!actualValue) {
    missingOrInvalid.push(`${key} FALTANTE`)
  } else if (actualValue !== expectedValue) {
    missingOrInvalid.push(
      `${key} ESPERADO ${expectedValue}, ACTUAL => ${actualValue}`
    )
  }
}
async function main() {
  if (fs.existsSync('.env') && missingOrInvalid.length === 0) {
    console.log(
      '✅ El archivo .env ya existe y contiene los elementos necesarios. Usando configuración existente.\n'
    )
    console.log('\n🐳 Levantando contenedor en docker\n')
    rl.close()
    runCommand('docker-compose', ['up'])
    return
  }
  console.log('\n🛠️  Configuración del entorno')

  const password = await ask('\n🔑 Contraseña de MySQL (puede dejarse vacío): ')
  const port_local = await ask(
    '\n🌐 Puerto de la API (por defecto: localhost:3000): '
  )
  const host_mysql = await ask(
    '\n🖥️ Host de MySQL (por defecto: localhost:3306): '
  )

  let requests

  do {
    const input = await ask('\n⏱️  Cantidad de requests cada 20 seg: ')
    requests = Number(input)

    if (isNaN(requests) || requests <= 0) {
      console.log('❌ Debe ser un número positivo. Intenta de nuevo.\n')
    }
  } while (isNaN(requests) || requests <= 0)
  const envContent = `
DATABASE_USER=root
DATABASE_PASSWORD=${password}
DATABASE_NAME=product_master
DATABASE_HOST=mysql
DATABASE_PORT=${host_mysql || 3306}
PORT=${port_local || 3000}
MAX_REQUESTS=${requests || 100}
AUTH_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30
`.trim()

  fs.writeFileSync('.env', envContent)
  console.log('\n✅ Archivo .env creado con éxito.\n')
  console.log('\n🐳 Construyendo contenedor en docker...\n')
  runCommand('docker-compose', ['up', '--build'])
  rl.close()
}

main()
