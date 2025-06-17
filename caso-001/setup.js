const { exec, spawn } = require('child_process')
const fs = require('fs')
const readline = require('readline')

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

async function main() {
    if (fs.existsSync('.env')) {
    console.log('✅ El archivo .env ya existe. Usando configuración existente.\n')
    console.log('\n🐳 Levantando contenedor en docker\n')
    rl.close()
    runCommand('docker-compose', ["up"])
    return
  }
  console.log('\n🛠️  Configuración del entorno')

  const password = await ask('🔑 Contraseña de MySQL (puede dejarse vacío): ')
  let requests

  do {
    const input = await ask('⏱️  Cantidad de requests cada 20 seg: ')
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
DATABASE_PORT=3306
PORT=3000
MAX_REQUESTS=${requests}
AUTH_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30
`.trim()

  fs.writeFileSync('.env', envContent)
  console.log('\n✅ Archivo .env creado con éxito.\n')
  console.log('\n🐳 Construyendo contenedor en docker\n')
  runCommand('docker-compose', ["up", "--build"])
  rl.close()
}

main()
