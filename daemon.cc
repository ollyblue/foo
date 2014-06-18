int daemon()
{
    int  fd;
    pid_t pid;
    if((pid = fork()) != 0)
    {
        exit(0);
    }

        setsid();

    signal(SIGINT, SIG_IGN);
    signal(SIGHUP, SIG_IGN);
    signal(SIGQUIT, SIG_IGN);
    signal(SIGPIPE, SIG_IGN);
    signal(SIGTTOU, SIG_IGN);
    signal(SIGTTIN, SIG_IGN);
    signal(SIGCHLD, SIG_IGN);
    signal(SIGTERM, SIG_IGN);
    
    struct sigaction sig;
    sig.sa_handler = SIG_IGN;
    sig.sa_flags = 0;
    sigemptyset(&sig.sa_mask);
    sigaction(SIGPIPE,&sig,NULL);
    
    umask(0);
	chdir("/");
    
    if((pid = fork()) != 0)
    {
        exit(0);
    }
   
    fd = open("/dev/null", O_RDWR);
    dup2(fd, STDIN_FILENO)    
    dup2(fd, STDOUT_FILENO)
    return 0;
}
