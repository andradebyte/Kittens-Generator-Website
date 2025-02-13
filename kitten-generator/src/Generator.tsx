import React, { useState, useEffect } from 'react';
import './Generator.css';
import { FaArrowRotateLeft, FaHeart } from "react-icons/fa6";
import jsonData from './data.json';

export default function Generator() {

    //Meow counter:
    const [meowCounter, setMeowCounter] = useState(0);

    //Color change on meow counter:
    const [color, setColor] = useState([`#FF0000`, `#FF7F00`, `#FFFF00`, `#00FF00`, `#B148E8`, `#E848A2`, `#E84948`, `#45C4B0`, `#9AEBA3`, `#DAFDBA`, `#FF4858`]);

    const randomColor = () => {
        return color[Math.floor(Math.random() * color.length)];
    }

    // Função para embaralhar um array
    const shuffleArray = (array: any[]): any[] => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    // Filtra as imagens não curtidas e mapeia corretamente
    const imgData = jsonData["images"].filter((image: any) => image.liked !== true);
    const [images, setImages] = useState(() => shuffleArray(imgData));
    const [counter, setCounter] = useState(0);
    const [image, setImage] = useState(images[0].url);

    // Estado para gerenciar os corações flutuantes
    const [floatingHearts, setFloatingHearts] = useState<number[]>([]);

    // Atualiza a imagem quando o contador ou as imagens mudam
    useEffect(() => {
        if (images.length > 0) {
            setImage(images[counter].url);
        }
    }, [counter, images]);

    const handleNextImage = () => {
        setCounter(prevCounter => {
            let newCounter = prevCounter + 1;
            if (newCounter >= images.length) {
                const imagesFiltered = images.filter((img: any) => img.liked !== true);
                const shuffledImages = shuffleArray(imagesFiltered);
                setImages(shuffledImages);
                newCounter = 0;
            }
            return newCounter;
        });
        console.log('A user generated a new image!');
    };

    // Dentro do seu componente Generator

    // Estado para armazenar os kittens curtidos
    const [likedKittens, setLikedKittens] = useState(() => {
        // Inicializa o estado lendo do localStorage, se existir
        const stored = localStorage.getItem('likedKittens');
        return stored ? JSON.parse(stored) : [];
    });

    // useEffect para atualizar o localStorage sempre que likedKittens mudar
    useEffect(() => {
        localStorage.setItem('likedKittens', JSON.stringify(likedKittens));
    }, [likedKittens]);

    const handleLike = () => {
        setImages(prevImages => {
            const newImages = [...prevImages];
            newImages[counter] = { ...newImages[counter], liked: true };
            return newImages;
        });
        console.log('A user liked the actual image!');

        const kittenUrl = images[counter].url;

        // Atualiza o estado apenas se o item não estiver presente
        setLikedKittens((prevLikedKittens: string[]) => {
            if (!prevLikedKittens.includes(kittenUrl)) {
                return [...prevLikedKittens, kittenUrl];
            }
            return prevLikedKittens;
        });

        // Adiciona um coração flutuante (gerando um ID único)
        const id = Date.now();
        setFloatingHearts(prev => [...prev, id]);

        setTimeout(() => {
            setFloatingHearts(prev => prev.filter(heartId => heartId !== id));
        }, 2000);
    };

    const playMeow = (number: number) => {
        try {
            const audio = new Audio(`/meow${number}.mp3`);
            audio.play();
        } catch (error) {
            console.error('Could not play audio:', error);
        }
    }

    return (
        <div className="Generator">
            <div>
                <img src={image} alt="Generated kitten" onClick={() => { setMeowCounter(meowCounter + 1); playMeow(Math.floor(Math.random() * 6) + 1) }} />
                {/* Renderiza os corações flutuantes */}
                {floatingHearts.map(id => (
                    <span key={id} className="floating-heart">
                        <FaHeart size={16} color="red" />
                    </span>
                ))}
            </div>
            <div className='buttonGeneratorContainer'>
                <button onClick={handleNextImage} className='buttonItemsGenerator'>
                    <FaArrowRotateLeft size={22} />
                </button>
                <button onClick={handleLike} className='buttonItemsGenerator'>
                    <FaHeart size={22} />
                </button>
            </div>
            <div className='meowSubtitle'>
                The cat meowed <span className='meowCounter' style={{ color: randomColor() }}>{meowCounter}</span> times!
            </div>
        </div>
    );
}

