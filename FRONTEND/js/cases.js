const documents = {
    'entity-1': {
        title: 'DOSSIER #001 - A SUSSURRADORA',
        classification: 'CLASSIFICAÇÃO: NÍVEL 5 - EXTREMAMENTE PERIGOSA',
        content: `<p><strong>Descrição:</strong> Entidade feminina de aparência espectral, vestindo trapos ensanguentados. Relatos indicam que se manifesta através de sussurros ininteligíveis que aumentam de volume até se tornarem gritos ensurdecedores.</p>
        <p><strong>Localização:</strong> Principalmente em asilos abandonados e hospitais psiquiátricos desativados.</p>
        <p><strong>Comportamento:</strong> A Sussurradora parece se alimentar do medo e da confusão de suas vítimas. Testemunhas relatam que ela repete fragmentos de memórias alheias em seus sussurros.</p>
        <p><strong>Vítimas:</strong> 17 casos confirmados nos últimos 5 anos. Todas as vítimas foram encontradas com os tímpanos perfurados e expressões de terror extremo.</p>
        <p><strong>Procedimentos de Contenção:</strong> Uso de proteção auricular é obrigatório. Não responda aos sussurros. Se contatada, recite o mantra de proteção 7-B (ver apêndice).</p>`
    },
    'entity-2': {
        title: 'DOSSIER #002 - O HOMEM SEM ROSTO',
        classification: 'CLASSIFICAÇÃO: NÍVEL 4 - ALTAMENTE PERIGOSO',
        content: `<p><strong>Descrição:</strong> Figura humana masculina de aproximadamente 1,90m, vestindo terno preto antiquado. Onde deveria haver um rosto, há apenas uma superfície lisa e sem características.</p>
        <p><strong>Localização:</strong> Avistamentos em estações de trem noturnas e becos urbanos.</p>
        <p><strong>Comportamento:</strong> O Homem Sem Rosto segue indivíduos por longas distâncias, sempre mantendo exatos 10 passos de distância. Se a vítima se virar para encará-lo, ele desaparece.</p>
        <p><strong>Vítimas:</strong> 8 casos de desaparecimento associados. As vítimas são sempre encontradas 3 dias depois, sem memória dos eventos e com o rosto temporariamente desfigurado.</p>
        <p><strong>Procedimentos de Contenção:</strong> Nunca olhe diretamente para ele por mais de 3 segundos. Se avistado, entre imediatamente em um local iluminado e movimentado.</p>`
    },
    'creature-1': {
        title: 'DOSSIER #004 - A COISA DO PORÃO',
        classification: 'CLASSIFICAÇÃO: NÍVEL 3 - PERIGOSA',
        content: `<p><strong>Descrição:</strong> Massa amorfa de tecido orgânico que se reorganiza constantemente. Emite um odor característico de carne podre e mofo.</p>
        <p><strong>Localização:</strong> Exclusivamente em porões de residências construídas antes de 1950.</p>
        <p><strong>Comportamento:</strong> A criatura se expande durante a noite, ocupando gradualmente todo o espaço disponível. Testemunhas relatam sentir "respiração" vindo das paredes.</p>
        <p><strong>Vítimas:</strong> 5 casos de asfixia atribuídos. Os corpos são encontrados sem sinais de violência, mas completamente desidratados.</p>
        <p><strong>Procedimentos de Contenção:</strong> Manter o porão iluminado com lâmpadas UV. Aplicar solução de sal grosso nas fundações a cada lua nova.</p>`
    }
};

function showDocument(title, docId) {
    const viewer = document.getElementById('documentViewer');
    const docTitle = document.getElementById('docTitle');
    const docClass = document.getElementById('docClass');
    const docContent = document.getElementById('docContent');
    docTitle.textContent = documents[docId].title;
    docClass.textContent = documents[docId].classification;
    docContent.innerHTML = documents[docId].content;
    viewer.style.display = 'block';
    document.querySelector('.file-cabinet').style.display = 'none';

    playSound('pageTurn');
}

function hideDocument() {
    // Esconde o visualizador e mostra o armário
    document.getElementById('documentViewer').style.display = 'none';
    document.querySelector('.file-cabinet').style.display = 'block';


    playSound('pageTurn');
}

function playSound(type) {
    // Implementação para efeitos sonoros
    console.log(`Playing ${type} sound`);
}

// Efeito de digitação para documentos
function typeWriter(text, element, speed) {
    let i = 0;
    element.innerHTML = '';
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}