import React, { useState, useEffect } from 'react';
import './Generator.css';
import { FaArrowRotateLeft, FaHeart } from "react-icons/fa6";
import jsonData from './data.json';

export default function Generator() {

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

    const handleLike = () => {
        setImages(prevImages => {
            const newImages = [...prevImages];
            newImages[counter] = { ...newImages[counter], liked: true };
            return newImages;
        });
        console.log('A user liked the actual image!');

        // Adiciona um coração flutuante (gerando um ID único)
        const id = Date.now();
        setFloatingHearts(prev => [...prev, id]);

        // Remove o coração após 2 segundos (duração da animação)
        setTimeout(() => {
            setFloatingHearts(prev => prev.filter(heartId => heartId !== id));
        }, 2000);
    };

    return (
        <div className="Generator">
            <div>
                <a href={image} target='_blank' rel='noreferrer'>
                    <img src={image} alt="Generated kitten" />
                    {/* Renderiza os corações flutuantes */}
                    {floatingHearts.map(id => (
                        <span key={id} className="floating-heart">
                            <FaHeart size={16} color="red" />
                        </span>
                    ))}
                </a>
            </div>
            <div className='buttonGeneratorContainer'>
                <button onClick={handleNextImage} className='buttonItemsGenerator'>
                    <FaArrowRotateLeft size={22} />
                </button>
                <button onClick={handleLike} className='buttonItemsGenerator'>
                    <FaHeart size={22} />
                </button>
            </div>
        </div>
    );
}

