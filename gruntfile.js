const { task } = require("grunt");

module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less:{
            development:{
                files:{
                    //arquivo resutado (arquivo de saída) : arquivo origem (entrada).
                    'dev/styles/main.css': 'src/styles/main.less' 
                }
            },
            production: {
                options:{
                    compress: true,
                },
                files: {
                    //arquivo resutado (arquivo de saída) : arquivo origem (entrada).
                    'dist/styles/main.min.css':'src/styles/main.less'
                }
            }
        },
        watch:{
            //observando os styles less
            less:{
                files:['src/styles/**/*.less'], //local de observação
                tasks: ['less:development'] //tarefas que serão executadas
            },
            //observando o html no ambiente dev
            html:{
                files: ['src/index.html'], //local de observação
                tasks: ['replace:dev'] //tarefa a ser executada
            }
        },
        // Função de substituição (replace)
        replace:{
            //configurando o replace (substituição) para o ambiente de desenvolvimento
            dev:{
                options:{
                    patterns: [
                        {
                            match: "ENDERECO_DO_CSS", //palavra que o plugin deve encontrar no html
                            replacement: './styles/main.css' //valor a ser substituído no html
                            //não se coloca .dev/styles/main.css porque depois de 
                            //criado o arquivo ele vai ser envidado para a pasta dev. 
                        },
                        {
                            match: "ENDERECO_DO_JS", //palavra que o plugin deve encontrar no html
                            replacement: '../src/scripts/main.js' //valor a ser substituído no html
                        }
                    ]
                },
                files: [
                    {
                    expand: true,
                    flatten: true,
                    src: ['src/index.html'], //arquivo a ser substituído
                    dest: 'dev/'

                    }
                ]
            },
            dist:{
                options:{
                    patterns: [
                        {
                            match: "ENDERECO_DO_CSS", //palavra que o plugin deve encontrar no html
                            replacement: './styles/main.min.css' //valor a ser substituído no html
                            //não se coloca .dev/styles/main.css porque depois de 
                            //criado o arquivo ele vai ser envidado para a pasta dev. 
                        },
                        {
                            match: "ENDERECO_DO_JS", //palavra que o plugin deve encontrar no html
                            replacement: './scripts/main.min.js' //valor a ser substituído no html
                        }
                    ]
                },
                files: [
                    {
                    expand: true,
                    flatten: true,
                    src: ['prebuild/index.html'], //arquivo a ser substituído
                    dest: 'dist/'
                    }
                ]
            }
        },
        //finção de compressão do html - Minificar
        htmlmin: {
            dist:{
                options:{
                    removeComments: true, //para remover qualquer comentário no html
                    collapseWhitespace: true, //remove espaço em branco
                },
                files:{
                    //pasta de destino : pasta de origem
                    'prebuild/index.html': 'src/index.html'
                }
            }
        }, 
        //colocamos no colchetes o nome da pasta que queremos deletar
        clean:['prebuild'],
        
        //configuração o plugin uglify
        uglify: {
            target:{
                files: {
                    //arquivo/local destino | arquivo/local origem
                    'dist/scripts/main.min.js' : 'src/scripts/main.js'
                }
            }

        }

    })

    //Carregamento de plugins
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //Tarefas - entre colchetes o sequenciamento de execução das tarefas
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify']);


}