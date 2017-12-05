const path     = require('path');
const gulp     = require('gulp');
const exec     = require('child_process').exec;
const notifier = require('node-notifier');

let input   = './main.cpp';
let output  = './dest/main';
let compier = 'clang++';

let frameworks = [
    'GLUT',
    'OpenGL'
].map( v => `-framework ${v}` ).join(' ');

let task = `${compier} ${frameworks} -o ${output} ${input}`;

gulp.task('watch', (e)=>{
    gulp.watch(path.join(__dirname, '*.cpp'), ()=>{
        exec(task, (err, stdout, stderr)=>{
            if ( err ){
                console.error(err);
                notifier.notify('build error');
            }
        });
    });
});
