

" 设置vim的运行时目录
" set runtimepath=$VIMRUNTIMEDIR

" 设置vim的色彩数
set t_Co=256

"设置vim提示为简短提示，例如[readonly]用[RO]来代替,[w]替代[written]
set shortmess+=

"风格
colorscheme	molokai

"开启语法高亮
syntax enable
syntax on

"开启文件类型检查，和文件类型插件
filetype on
filetype plugin on
filetype plugin indent on

"文件有改变，自动读取到当前buffer
set autoread

"查找时，是否忽略大小写
"set ignorecase

" // 回车后下一行起始处自动添加 //
" /* 回车后，下一行的起始处自动添加 *
set fo=r 

"设置跨行移动
set whichwrap=h,l,b,s,<,>

" 设置详细的帮助
set wildmenu

" 忽略编译中间文件
set wildignore=*.o,*~,*.pyc

"高亮当前行
set cursorline

"高亮当前列
set cursorcolumn

" 设置匹配模式，如输入左括号时匹配右括号
set showmatch

" 设置高亮匹配
set hlsearch

" 对待所有的数字为10进制，否则007之类的会当作8进制
set nrformats=

" 显示行号
set nu

" 设置tab
set tabstop=4
set sw=4
set sts=4

" 设置超长行自动换行(取消设置为 set nowrap)
set wrap

" 在多少列宽度显示标尺
set colorcolumn=100

"设置自动对齐
set autoindent
set si

" 设置高亮的开关
function! s:ToggleHighLightSearch()
	set hls!
endfunction


" 多语言设置
if has("multi_byte")
	set fileencodings=ucs-bom,utf-8,cp936,big5,euc-jp,euc-kr,latin1
	if v:lang =~ "^zh_CN"
		set encoding=cp936
		set termencoding=cp936
		set fileencoding=cp936
	elseif v:lang =~ "^zh_TW"
		set encoding=big5
		set termencoding=big5
		set fileencoding=big5
	elseif v:lang =~ "^ko"
		set encoding=euc-kr
		set termencoding=euc-kr
		set fileencoding=euc-kr
	elseif v:lang =~ "^ja_JP"
		set encoding=euc-jp
		set termencoding=euc-jp
		set fileencoding=euc-jp
	endif

	if v:lang =~ "utf8$" || v:lang =~ "UTF-8$"
		set encoding=utf-8
		set termencoding=utf-8
		set fileencoding=utf-8
	endif
else
	echoerr "Sorry, this version of (g)vim was not compiled with multi_byte"
endif

" map设置
let mapleader = ","

"开关高亮设置
nmap <unique><silent><leader>H :call <SID>ToggleHighLightSearch()<CR>

"tab 相关的map键映射
map <unique><leader>t :tab new<CR>
map <unique><leader>n :tabn<CR>
map <unique><leader>p :tabp<CR>
map <unique><leader>c :tabclose<CR>
map <unique><leader>0 :tab first<CR>
map <unique><leader>$ :tab last<CR>

"保存，退出相关键映射
map <unique><leader>q :q<CR>
map <unique><leader>w :w<CR>
map <unique><leader>W :w!<CR>
map <unique><leader>Q :q!<CR>
map <unique><leader>x :wq<CR>
map <unique><leader>a :qa<CR>

if has("gui_running")
	set lines=40 columns=120
	set guioptions -=T
	set guioptions -=m
	map <silent><unique><F3>L :source $VIM/_vimrc<CR>
	map <silent><unique><F3>E :new $VIM/_vimrc<CR>
else
	map <silent><unique><F3>L :source ~/.vimrc<CR>
	map <silent><unique><F3>E :new ~/.vimrc<CR>
endif

map <silent><unique><F3>F :echo &fileencoding<CR>
map <silent><unique><F3>% :source %<CR>

" 设置打开编译错误窗口
map <silent><unique><leader>o :copen <CR>

"设置移动窗口键映射
map <silent><unique><leader>j <C-w>j
map <silent><unique><leader>k <C-w>k
map <silent><unique><leader>h <C-w>h
map <silent><unique><leader>l <C-w>l

"设置打开最近浏览的文件列表
nmap <silent><unique><leader>b :bro ol<CR>

"设置svn
nmap <silent><unique><leader>D :VCSDiff<CR>
nmap <silent><unique><leader>L :VCSLog<CR>
nmap <silent><unique><leader>S :VCSStatus<CR>
nmap <silent><unique><leader>A :VCSAdd<CR>
nmap <silent><unique><leader>C :VCSCommit<CR>
nmap <silent><unique><leader>U :VCSUpdate<CR>
nmap <silent><unique><leader>V :VCSVimDiff<CR>
nmap <silent><unique><leader>K :VCSLock<CR>

"执行上次的命令
map <silent><unique><leader>. :!! <CR>

"一键编译文件
map <unique><F5> :!g++ -g -Wall %<CR>
map <unique><F6> :!./a.out<CR>

map <unique><unique><F10> :Tlist <CR>

"执行脚本
map <unique><leader>X :!chmod +x % && ./% <CR>

"设置使用makefile编译
map <unique><leader>m :make <CR>
map <unique><leader>M :make clean && make <CR>
map <unique><leader>I :make clean && make && make install <CR>

"设置C++的tags
nmap <unique><F12> :!ctags -R --c++-kinds=+p --fields=+iaS --extra=+q --exclude=.svn --sort=yes

"设置生成cscope的db
nmap <unique><F7> :!cscope -Rbq

"打开NERDTree
nmap <unique><silent><F9> :NERDTreeToggle <CR>

"打开taglist窗口
nmap <unique><silent><F8> :Tlist <CR>

"消除每行后面的空格
map <unique><silent><F3>S :%s/\s\+$//g<CR><CR>

" 设置cnext的map
nmap <unique><silent><CR> :cn<CR>

"设置taglist窗口布局
let Tlist_Show_One_File = 1 
let Tlist_Exit_OnlyWindow = 1  
let Tlist_Use_Right_Window = 1  

"设置Omni自动实例选项
set completeopt=menu,menuone
let OmniCpp_MayCompleteDot = 1 " autocomplete with .
let OmniCpp_MayCompleteArrow = 1 " autocomplete with ->
let OmniCpp_MayCompleteScope = 1 " autocomplete with ::
let OmniCpp_SelectFirstItem = 2 " select first item (but don't insert)
let OmniCpp_NamespaceSearch = 2 " search namespaces in this and included files
let OmniCpp_ShowPrototypeInAbbr = 1 " show function prototype  in popup window
let OmniCpp_GlobalScopeSearch=1
let OmniCpp_DisplayMode=1
let OmniCpp_DefaultNamespaces=["std"]

set tags+=~/paipai/item/tags
set tags+=~/paipai/auction/tags
set tags+=~/paipai/comm/tags
set tags+=~/paipai/b2b2c_comm/tags

" set for add cscope file
cscope add /home/bluezheng/paipai/auction/cscope.out
cscope add /home/bluezheng/paipai/comm/cscope.out
cscope add /home/bluzheng/paipai/item/cscope.out

"set for local tags file in tags.vim
"if getfsize(".tagsvim") > 0 
"	source .tagsvim
"endif 

"auto load locl tags file and cscope.out
if getfsize("./tags") > 0
	set tags+=./tags
endif

if getfsize("./cscope.out") > 0
	cscope add ./cscope.out
endif

" // Set the height of Source Explorer window                                  "
let g:SrcExpl_winHeight = 8
"                                                                              "
" // Set 100 ms for refreshing the Source Explorer                             "
let g:SrcExpl_refreshTime = 200

" // Set "Enter" key to jump into the exact definition context                 "
let g:SrcExpl_jumpKey = "<CR>"
"                                                                              "
" // Set "Space" key for back from the definition context                      "
let g:SrcExpl_gobackKey = "<SPACE>"
"                                                                              "
" // In order to Avoid conflicts, the Source Explorer should know what plugins "
" // are using buffers. And you need add their buffer names into below list    "
" // according to the command ":buffers!"                                      "
let g:SrcExpl_pluginList = [
         \ "__Tag_List__",
         \ "_NERD_tree_",
         \ "Source_Explorer"
     \ ]
                                                                              "
" // Enable/Disable the local definition searching, and note that this is not  "
" // guaranteed to work, the Source Explorer doesn't check the syntax for now. "
" // It only searches for a match with the keyword according to command 'gd'   "
let g:SrcExpl_searchLocalDef = 1
"                                                                              "
" // Do not let the Source Explorer update the tags file when opening          "
let g:SrcExpl_isUpdateTags = 0

" set for auto save & load session
autocmd VimEnter * call <SID>LoadLastSession()
autocmd VimLeave * call <SID>SaveLastSession()

function! s:LoadLastSession()
	let s:session_switch = "s" 
	" argument shold be "s" then load the session.vim
	let s:argv_1 = ""

	if argc() > 0 
		let s:argv_1 = argv(0)
	endif
	if argc() == 1 && s:argv_1 == s:session_switch  
		exec 'source $HOME/.vim/sessions/session.vim'
	endif
endfunction

function! s:SaveLastSession()
	exec 'mksession! $HOME/.vim/sessions/session.vim'
endfunction

nmap <unique><F3>s :cs find s <c-r>=expand("<cword>")<cr><cr>
nmap <unique><F3>g :cs find g <c-r>=expand("<cword>")<cr><cr>
nmap <unique><F3>c :cs find c <c-r>=expand("<cword>")<cr><cr>
nmap <unique><F3>t :cs find t <c-r>=expand("<cword>")<cr><cr>
nmap <unique><F3>e :cs find e <c-r>=expand("<cword>")<cr><cr>
nmap <unique><F3>f :cs find f <c-r>=expand("<cfile>")<cr><cr>
nmap <unique><F3>i :cs find i ^<c-r>=expand("<cfile>")<cr>$<cr>
nmap <unique><F3>d :cs find d <c-r>=expand("<cword>")<cr><cr>


" set for auto save & load views
"autocmd BufWinLeave ?* mkview
"autocmd BufWinEnter ?* loadview

"set for switch on/off the paste
function! s:PasteSwitch()
	let s:paste_ = &paste
	if s:paste_ == 1
		exec 'set nopaste'
		echomsg "set nopaste mode"
	endif
	if s:paste_ == 0
		exec 'set paste'
		echomsg "set paste mode"
	endif
endfunction

map <unique><silent><leader>P :call <SID>PasteSwitch()<CR>
map <unique><silent><leader>r :MRU<CR>

"let MRU_Use_Current_Window = 1 
let MRU_Auto_Close=0 
let MRU_Window_Height=4

function! s:ToggleLineNumber()
	set nu!
endfunction

nmap <unique><silent><leader>N :call <SID>ToggleLineNumber()<CR>


nmap <SPACE> 

"  vim添加行号，也可用于替换 
"  :let i=1
"  :g/0/s//\=i/ |let i=i+1
"  :g/$/s//\= " = ". i . ","/ | let i=i+1
"  vim生成连续的数字
"“ let i=670676 | g/^/s//\=i . " " / | let i=i+1
" 在脚本中执行的代码片段:
"  let j = 10                                                                                             
"  while j < 100                                                                                          
"    exec 'normal! i' . j . nr2char(13)                                                                 
"    let j = j + 1                                                                                      
"  endwhile
"
" 直接在命令模式中执行的代码片段: let j=10 | while j < 100 |  exec 'normal! i' . j . nr2char(13)  | let j=j+1 | endwhile


if !exists('g:airline_symbols')
  let g:airline_symbols = {}
endif
let g:airline_symbols.paste = 'ρ'

" 添加的protobuf IDL 语法高亮ftdetect
augroup filetype
	au! BufRead,BufNewFile *.proto setfiletype proto
augroup end

" 添加golang的语法高过 ftdetect
augroup filetype
	au! BufRead,BufNewFile *.go set filetype=go
augroup end

" 在vim的宏中使用定时，比如每1秒钟插入一个数字
" 具体做法如下： 
" qa 进入宏记录，按i,然后<ESC> <ESC>两次，最后在输入需要的文字，按j <ESC>恢复 normal模式
" 最后的宏看起来如下:
let @z='i1^M^[:sleep 1^M^M^['



