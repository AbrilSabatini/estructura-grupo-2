const fs = require('fs')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const ask = (question) =>
  new Promise((resolve) => rl.question(question, resolve))

async function main() {
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

  rl.close()
}

main()
