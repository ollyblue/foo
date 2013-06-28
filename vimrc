"let $VIMRUNTIME="/home/bluezheng/third-src/vim72/runtime"
"set runtimepath=/home/bluezheng/third-src/vim72/runtime


"set t_Co=256
syntax enable
"colorscheme	desert
"set t_Co=256
"let g:solarized_termcolors=32
"set background=dark
"colorscheme solarized
" evening darkblue
colorscheme desert

syntax on
filetype on
filetype plugin on

" set high light search word
set hlsearch

" set treat all number to be decimal number(if not 007 will treat as octal number)
set nrformats=

set nu

set tabstop=4
set sw=4
set sts=4

"set nowrap
set wrap

"set for tlist
let Tlist_Show_One_File = 1 
let Tlist_Exit_OnlyWindow = 1  
let Tlist_Use_Right_Window = 1  
"cs add cscope.out
"
set colorcolumn=100

" set the indent
set autoindent

"set smartindent
set si

"
"set for OmniCpp plugin
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

" set for mapleader char
let mapleader = ","

map <unique><leader>t :tab new<CR>
map <unique><leader>n :tabn<CR>
map <unique><leader>p :tabp<CR>
map <unique><leader>s :tabs<CR>
map <unique><leader>c :tabclose<CR>
map <unique><leader>0 :tab first<CR>
map <unique><leader>$ :tab last<CR>
map <unique><leader>q :q<CR>
map <unique><leader>w :w<CR>
map <unique><leader>W :w!<CR>
map <unique><leader>! :q!<CR>
map <unique><leader>x :wq<CR>
map <unique><leader>a :qa<CR>

map <silent><unique><leader>L :source ~/.vimrc<CR>
map <silent><unique><leader>ee :new ~/.vimrc<CR>

" set for move betweet the windows
map <silent><unique><leader>j <C-w>j
map <silent><unique><leader>k <C-w>k
map <silent><unique><leader>h <C-w>h
map <silent><unique><leader>l <C-w>l
map <silent><unique><leader>f <C-f>
map <silent><unique><leader>b <C-b>

" set for execute last command ==> !!
map <silent><unique><leader>. :!! <CR>

" set for complie one file
map <unique><F5> :!g++ -g -Wall %<CR>
map <unique><F6> :!./a.out<CR>
map <unique><unique><F10> :Tlist <CR>

" set for execute shell script
map <unique><leader>+x :!chmod +x %<CR>
map <unique><leader>X :!./% <CR>

" set for compile
map <unique><leader>m :make <CR>
map <unique><leader>M :make clean &&make <CR>
map <unique><leader>ma :make clean && make && make install <CR>
map <unique><leader>, :make <CR>

"set for c++ tags
nmap <unique><F12> :!ctags -R --c++-kinds=+p --fields=+iaS --extra=+q --exclude=.svn --sort=yes
"set for NERDTree:
nmap <unique><silent><F9> :NERDTreeToggle <CR>
"set for taglist
nmap <unique><silent><F8> :Tlist <CR>
" // The switch of the Source Explorer                                         "
"nmap <F9> :SrcExplToggle <CR>

" multi-encoding setting

if has("multi_byte")
	"set bomb
	set fileencodings=ucs-bom,utf-8,cp936,big5,euc-jp,euc-kr,latin1
	" CJK environment detection and corresponding setting
	if v:lang =~ "^zh_CN"
		" Use cp936 to support GBK, euc-cn == gb2312
		set encoding=cp936
		set termencoding=cp936
		set fileencoding=cp936
	elseif v:lang =~ "^zh_TW"
		" cp950, big5 or euc-tw
		" Are they equal to each other?
		set encoding=big5
		set termencoding=big5
		set fileencoding=big5
	elseif v:lang =~ "^ko"
		" Copied from someone's dotfile, untested
		set encoding=euc-kr
		set termencoding=euc-kr
		set fileencoding=euc-kr
	elseif v:lang =~ "^ja_JP"
		" Copied from someone's dotfile, untested
		set encoding=euc-jp
		set termencoding=euc-jp
		set fileencoding=euc-jp
	endif

	" Detect UTF-8 locale, and replace CJK setting if needed
	if v:lang =~ "utf8$" || v:lang =~ "UTF-8$"
		set encoding=utf-8
		set termencoding=utf-8
		set fileencoding=utf-8
	endif
else
	echoerr "Sorry, this version of (g)vim was not compiled with multi_byte"
endif

"set tags=tags
"set tags+=/data/blue/.systags


set tags+=~/paipai/tags
set tags+=~/paipai/auction/tags
set tags+=~/paipai/comm/tags
set tags+=~/paipai/b2b2c_comm/tags


"set for local tags file in tags.vim
"if getfsize(".tagsvim") > 0 
"	source .tagsvim
"endif 

"                                                                              "
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


" set for auto save & load views
"autocmd BufWinLeave ?* mkview
"autocmd BufWinEnter ?* loadview
