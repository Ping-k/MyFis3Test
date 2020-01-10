
// ========全局配置=======

/**配置文件指纹：js、css、image**/
fis.match('*.{js,css}', {
  useHash: true
});

fis.match('::image', {
  useHash: true
});

/**压缩静态资源：js、css、png**/
fis.match('*.js', {
  optimizer: fis.plugin('uglify-js')
});

fis.match('*.css', {
  optimizer: fis.plugin('clean-css')
});

fis.match('*.png', {
  optimizer: fis.plugin('png-compressor', {
    type: 'pngquant' // 默认：pngcrush，默认有异常
  })
});

/**文件忽略**/
fis.set('project.ignore', [
  'output/**',
  'dist/**',
  'node_modules/**',
  '.git/**',
  '.svn/**',
  'fis-conf*.js',
  'package*.json',
]);

fis.match('fis-conf*.js', {
  // 设置 release 为 FALSE，不再产出此文件
  release: false
})

// =======开发配置=======
fis.media('dev')
  .match('*', {
    useHash: false, // 文件指纹
    optimizer: null // 不压缩
  });

// =======打包配置=======
fis.media('build')
  // 编译输出目录
  .match('**', {
    deploy: fis.plugin('local-deliver', {
      to: './dist'
    })
  })