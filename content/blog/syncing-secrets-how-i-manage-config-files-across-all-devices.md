+++
title = "Syncing Secrets: How I Manage Config Files Across All Devices!"
date = 2023-12-24
+++

# introduction.

Syncing configuration files across multiple devices poses a grate challenge. Tools like Syncthing or Resilio Sync can help, but what happens when a device goes offline? Massive sync conflicts arise, necessitating a manual hunt for the root cause and deletion of conflicting files. Sometimes, these conflicts spread throughout your sync network, causing persistent issues. Cloud services like Dropbox, OneDrive, Google Drive, or iCloud Drive are alternatives, but trusting a company with your data may be a concern. What you  need is a solution that handles versioning, conflict resolution, and is easy to manage. Enter Git – the go-to tool for software developers, even used by major companies like Uber. In this article, I'll walk you through how I use Git to effortlessly sync my configuration files across all devices. Let's dive into the details and get you started on simplifying your configuration file management.

## What you'll need.

Before diving in, ensure you have a couple of essential prerequisites in place. Firstly, you'll need a [GitHub](https://github.com) account, and secondly, make sure [Git](https://git-scm.com) is installed on your computer. Once you've taken care of these two steps, you'll be all set for the next stage.

## Setting up your configuration repository.

Now, to create your configuration repository, I'll demonstrate using[gh-cli](https://cli.github.com)but you can also achieve this on the[github](https://github.com)website. With[gh-cli](https://cli.github.com)open a PowerShell window on Windows or Bash/Zsh on Linux, then run:

```console
gh repo create
```

Answer the prompted questions with your preferred settings. If you opted not to clone the repository locally, use one of the following commands:

 * If not using SSH.

```console
git clone https://github.com/yourUserName/yourRepositoryName.git
```

* If using SSH without [gh-cli](https://cli.github.com)

```console
git clone git@github.com:yourUsername/yourRepositoryName
```

* If using [gh-cli](https://cli.github.com)

```console
gh repo clone yourUsername/yourRepositoryName
```

Now, let's move on to the next stage.

## Getting your configs in the right place.

To start, you'll need to copy all of the configuration files that you want to store in git in to the directory in which your repository is located. Now, we need to create some links so that hour programs will still think that hour configuration files are in the right place. I like to set up a script to do this(links.bat on Windows, links.sh on Linux and MacOs)
here is an example for Linux and MacOs showing how I simlinked my [starship](https://starship.rs) config:

```bash
ln -s ~/configs/.config/starship.toml ~/.config/starship.toml
```

This can also be done with a directory. It is a bit more complicated to do this on windows, if your going to link a file you need to make a hardlink using:

```ps
mklink /H /path/to/destination/file /path/to/source/file
```

If you want to link an entire folder, you'll need a junction link using:

```ps
mklink /J /path/to/destination/directory /path/to/source/directory
```

Here is my links.bat as an example.

```batch
mklink /J %appdata%\foobar2000-v2 foobar2000-v2 
mklink /J %appdata%\ExplorerPatcher ExplorerPatcher
mklink /J %appdata%\Rizonesoft Rizonesoft 
mklink /J %userprofile%\Documents\WindowsPowerShell ps5
mklink /J %userprofile%\Documents\PowerShell ps7
mklink /J %localappdata%\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState terminal
mklink /J %userprofile%\portable\KeyOp\data keyop
mklink /J %appdata%\nvda nvda
mklink /J %userprofile%\.config\scoop scoop
mklink /H %appdata%\Notepad2.ini unsorted\Notepad2.ini 
mklink /H %userprofile%\komorebi.json komorebi\komorebi.json
mklink /H %userprofile%\applications.yaml komorebi\applications.yaml
mklink /H %userprofile%\.config\whkdrc unsorted\whkdrc
```

Now that we've got that out of the way, lets move on.

## Making your first commit and push.

In order to push hour files to github, we need to commit the changes we just made to the repository. To do this run the following while in the repositories directory:

```console
git add .
git commit -m "Initial configuration upload.
```
Than to push hour changes to the github remote:

```console
git push
```

## Your all done, but heres some tips.
Now all you have to do is clone the repo on to another computer and run your links script. Boom! you have your configs. If you ever want to update them from your main machine or a nother computer, all you have to do is commit and push your changes. Heres some tips to improove your experience.

1. Handling multiple operating systems.

To do this I Have created a git branch for each operating system. If you also want to do this, run the following on the repository (I'll use Windows as an example):

```ps
git branch win
git checkout win
```

Add your files and links script. than run:

```ps
git add .
git commit -m "Initial upload of windows files."
git push -u origin win
```

This allows git to seporate and keep a completely different version history than the Mac, Linux, or main branch. I tipicly just use main for configs that are universal accross all   operating systems.

2. Clean and clear commit messages.

You may have been wondering what the -m flag was for in the git commit command. The m stands for message, this allows you to attach a message to your commit. It is very useful wen looking thrue your git history, but not if you have unclear messages. I have a specific method I follow wen writing commit messages for my config repo. It goes as follows.

```console
git commit -m "config I updated: Changes I made."
```

For example: lets say I added Kubernetes to my starship config. I would write something like this:

```console
git commit -m "starship: Adds Kubernetes module, sets an accessible symbol for it."
```

This way I keep my git commit history readable and organized.

## conclusion

With this approach, you can effortlessly synchronize your configuration files across all your devices, ensuring a conflict-free environment that won't disrupt your workflow. Thanks for reading—I trust this simplifies the syncing process for you.

### Watch the video

{{ youtube(id = "AT6kPGx9cLU") }}
