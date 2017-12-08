const path     = require('path');
const gulp     = require('gulp');
const exec     = require('child_process').exec;
const notifier = require('node-notifier');

let input   = './main.cpp ./sub.cpp';
let output  = './dest/main';

let command = [
    'clang++',
    '-std=c++11',
    '-Wall',
    `-lglfw`,
    `-framework OpenGL`,
    `-o ${output} ${input}`
].join(' ');

gulp.task('watch', (e)=>{
    gulp.watch(path.join(__dirname, '*.cpp'), ()=>{
        exec(command, (err, stdout, stderr)=>{
            if ( err ){
                console.error(err);
                notifier.notify('build error');
            }
        });
    });
});
