" Mappings example for use with gdb
" Maintainer:    <xdegaye at users dot sourceforge dot net>
" Last Change:    Mar 6 2006

if ! has("gdb")
    finish
endif

let s:gdb_k = 1
nmap <F7> :call <SID>Toggle()<CR>

" Toggle between vim default and custom mappings
function! s:Toggle()
    if s:gdb_k
    let s:gdb_k = 0

    map <Space> :call gdb("")<CR>
    nmap <silent> <C-Z> :call gdb("\032")<CR>

    nmap <silent> <C-K>b :call gdb("info breakpoints")<CR>
    nmap <silent> <C-K>B :call gdb("info breakpoints")<CR>
    nmap <silent> <C-K><C-L> :call gdb("info locals")<CR>
    nmap <silent> <C-K><C-A> :call gdb("info args")<CR>
    nmap <silent> <C-K>S :call gdb("step")<CR>
    nmap <silent> <C-K>s :call gdb("step")<CR>
    nmap <silent> <C-K><C-I> :call gdb("stepi")<CR>
    nmap <silent> <C-K><C-N> :call gdb("next")<CR>
    "nmap <silent> <C-K><C-X> :call gdb("nexti")<CR>
    nmap <silent> <C-K><C-F> :call gdb("finish")<CR>
    nmap <silent> <C-K><C-R> :call gdb("run")<CR>
    nmap <silent> <C-K>q :call gdb("quit")<CR>
    nmap <silent> <C-K>Q :call gdb("quit")<CR>
    nmap <silent> <C-K>c :call gdb("continue")<CR>
    nmap <silent> <C-K>C :call gdb("continue")<CR>
    nmap <silent> <C-K><C-W> :call gdb("where")<CR>
    nmap <silent> <C-K><C-U> :call gdb("up")<CR>
    nmap <silent> <C-K><C-D> :call gdb("down")<CR>

    " set/clear bp at current line
    nmap <silent> <C-K><C-B> :call <SID>Breakpoint("break")<CR>
    nmap <silent> <C-K><C-E> :call <SID>Breakpoint("clear")<CR>

    " print value at cursor
    nmap <silent> <C-K><C-P> :call gdb("print " . expand("<cword>"))<CR>

    " display Visual selected expression
    "vmap <silent> <C-K><C-P> y:call gdb("createvar " . "<C-R>"")<CR>
    vmap <silent> <C-K><C-P> y:call gdb("print " . "<C-R>"")<CR>

    " print value referenced by word at cursor
    nmap <silent> <C-K><C-X> :call gdb("print *" . expand("<cword>"))<CR>
    "vmap <silent> <C-K><C-X> y:call gdb("createvar " . "*<C-R>"" )<CR>
    vmap <silent> <C-K><C-X> y:call gdb("print " . "*<C-R>"" )<CR>

    nmap <silent> <C-K>t :call gdb("ptype " . expand("<cword>"))<CR>
    nmap <silent> <C-K>T :call gdb("ptype " . expand("<cword>"))<CR>
    nmap <silent> <C-K><C-T> :call gdb("ptype (struct " . expand("<cword>") . "* )0")<CR>

    echohl ErrorMsg
    echo "gdb keys mapped"
    echohl None

    " Restore vim defaults
    else
    let s:gdb_k = 1
    nunmap <Space>
    nunmap <C-Z>

    nunmap <C-K>b
    nunmap <C-K>B
    nunmap <C-K><C-L>
    nunmap <C-K><C-A>
    nunmap <C-K>S
    nunmap <C-K>s
    nunmap <C-K><C-I>
    nunmap <C-K><C-N>
    " nunmap <C-K><C-X>
    nunmap <C-K><C-F>
    nunmap <C-K><C-R>
    nunmap <C-K>q
    nunmap <C-K>Q
    nunmap <C-K>c
    nunmap <C-K>C
    nunmap <C-K><C-W>
    nunmap <C-K><C-U>
    nunmap <C-K><C-D>

    nunmap <C-K><C-B>
    nunmap <C-K><C-E>
    nunmap <C-K><C-P>
    vunmap <C-K><C-P>
    nunmap <C-K><C-X>
    vunmap <C-K><C-X>
    nunmap <C-K>t
    nunmap <C-K>T
    nunmap <C-K><C-T>

    echohl ErrorMsg
    echo "gdb keys reset to default"
    echohl None
    endif
endfunction

" Run cmd on the current line in assembly or symbolic source code
" parameter cmd may be 'break' or 'clear'
function! s:Breakpoint(cmd)
    " An asm buffer (a 'nofile')
    if &buftype == "nofile"
    " line start with address 0xhhhh...
    let s = substitute(getline("."), "^\\s*\\(0x\\x\\+\\).*$", "*\\1", "")
    if s != "*"
        call gdb(a:cmd . " " . s)
    endif
    " A source file
    else
    let s = "\"" . fnamemodify(expand("%"), ":p") . ":" . line(".") . "\""
    call gdb(a:cmd . " " . s)
    endif
endfunction

" map vimGdb keys
" Zhao.rufei: disable gdb by default
" call s:Toggle()