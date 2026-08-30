import fs from 'fs'

async function run() {
    const pdfBuffer = fs.readFileSync('test_linkedin_profile.pdf')
    console.log('Sending test_linkedin_profile.pdf (' + pdfBuffer.length + ' bytes) using native FormData...')

    const blob = new Blob([pdfBuffer], { type: 'application/pdf' })
    const formData = new FormData()
    formData.append('file', blob, 'test_linkedin_profile.pdf')

    const response = await fetch('http://localhost:3000/api/analyze', {
        method: 'POST',
        headers: {
            'Origin': 'http://localhost:3000',
            'Referer': 'http://localhost:3000/loading-analysis'
        },
        body: formData
    })

    console.log('Response Status:', response.status)
    const data = await response.json()
    console.log('Response Score:', data.data?.linkedInScore)
    console.log('Response Tier:', data.data?.tier)
    console.log('Response Name:', data.data?.profile?.name)
    console.log('Response Headline:', data.data?.profile?.headline)
    console.log('Response Headlines Count:', data.data?.headlineRewrites?.length)

    if (response.status === 200 && data.data?.linkedInScore) {
        console.log('\n==============================================')
        console.log('✓ POST /api/analyze SUCCEEDED WITH HTTP 200!')
        console.log('==============================================')
    } else {
        throw new Error('API failed: ' + JSON.stringify(data))
    }
}

run().catch(err => {
    console.error(err)
    process.exit(1)
})
